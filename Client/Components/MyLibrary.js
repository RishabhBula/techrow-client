import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import {getMylibrary} from '../../actions/getMylibrary';
import {setMylibraryquery} from '../../actions/setMylibraryquery';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

class MyLibrary extends Component{
	constructor(props){
		super(props);
    this.state = {
      mylibrary:[],
      search:"",
      searchheader:false,
      searcharray:[],
      loading:false
    }
	}
  
  componentDidMount(){
    if(this.props.myLibraryquery.query==""){
      this.mylibrary()
    }
    else{
      this.setState({search:this.props.myLibraryquery.query,searchheader:true})
      this.search(this.props.myLibraryquery.query)
    }
  }

  async mylibrary(){
      try {
          if(this.props.myLibrary.mylibrary.length==0){ this.setState({loading:true}) }
          let myLibrary =[];
          let library = await firebase.firestore().collection('users').doc(this.props.auth.authData.uid).collection('myLibrary').where('status', '==', true).get()
          // let library = await firebase.firestore().collection('contents').get()
          // console.log("library",library.size)
                              library.forEach((item) =>{
                                myLibrary.push(item.data())
                              })
          // console.log("myLibrary",myLibrary)
          this.props.getMylibrary(myLibrary)
          this.setState({searcharray:myLibrary,loading:false})
          return myLibrary

        }
        catch (err) {
            console.log("Error", err)
            this.setState({loading:false})
            return err
        }
  }

  onItemClick(id){
    window.location.href='#/class/'+id+'/theater'
  }

  // search123(s){
  //   // console.log("this.state.search",this.state.search)
  //   this.props.setMylibraryquery(s,0)
  //   firebase.firestore().collection('users').doc(this.props.auth.authData.uid).collection('myLibrary').where('status', '==', true).where('searchQuery', '>=', s).where('searchQuery', '<=', s+ '\uf8ff')
  //   // firebase.firestore().collection('contents').where('searchQuery', '>=', s).where('searchQuery', '<=', s+ '\uf8ff')
  //   .get()
  //   .then((querySnapshot) => {
  //       let myLibrary =[];
  //       querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           myLibrary.push(doc.data())
  //       });
  //       this.props.getMylibrary(myLibrary)
  //       if(this.state.search==""){ this.setState({searchheader:false}) }else{ this.setState({searchheader:true}) }
  //   })
  //   .catch(function(error) {
  //       console.log("Error getting documents: ", error);
  //   });
  // }

  async search(s){
    // console.log("this.state.search",this.state.search)
    try {
    this.props.setMylibraryquery(s,0)
    let one = firebase.firestore().collection('users').doc(this.props.auth.authData.uid).collection('myLibrary').where('status', '==', true).where('searchQuery', '>=', s).where('searchQuery', '<=', s+ '\uf8ff').get()
    let two = firebase.firestore().collection('users').doc(this.props.auth.authData.uid).collection('myLibrary').where('status', '==', true).where('searchQuery2', '>=', s).where('searchQuery2', '<=', s+ '\uf8ff').get()
    // firebase.firestore().collection('contents').where('searchQuery', '>=', s).where('searchQuery', '<=', s+ '\uf8ff')
    let [three,four] = await Promise.all([one,two])
    console.log("three",three.size)
    console.log("four",four.size)
          let myLibrary =[];
          three.forEach((item) =>{
            myLibrary.push(item.data())
          })
          four.forEach((item) =>{
            myLibrary.push(item.data())
          })

          function removeDuplicates(myArr, prop) {
                        return myArr.filter((obj, pos, arr) => {
                            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
                        });
                    }
                    let unique = removeDuplicates(myLibrary, "id")
          console.log("unique",unique)
          this.props.getMylibrary(unique)
    }
    catch (err) {
        console.log("Error", err)
        this.setState({loading:false})
        return err
    }
  }

  search2(event){
      if (event.keyCode == 13 || event.which == 13){
                    this.search(this.state.search.toLowerCase());
                }
  }
  trimm(a){
    var string = a;
    var length = 80;
    var trimmedString = string.length > length ? 
                        string.substring(0, length - 3) + "..." : 
                        string;
    return trimmedString;
  }


  render(){
      return(
         <div className="dashboard animated fadeIn">
          <div>
            {this.state.searchheader==false?<h2>My Library</h2>:<h2>Search Results</h2>}
            <div className="search form-group">
              <input type="text" className="form-control" placeholder="Search Content" value={this.state.search} onChange={(e) =>{ this.setState({search:e.target.value}); if(e.target.value==""){ this.props.setMylibraryquery("",0);this.mylibrary() } }} onKeyPress={(event) =>{ this.search2(event) }} />
              <button onClick={() =>{ this.search(this.state.search.toLowerCase()) }}><img src="../images/search-icon.png" className="img-fluid"/></button>
            </div>
            {this.state.loading==false ? <div className="classesList">
              {this.props.myLibrary.mylibrary.length==0 && this.state.searchheader==true &&(<div style={{textAlign:'center',display: 'block'}} className="row">
               
                <span>No results found.!</span>

              </div>)}
              {this.props.myLibrary.mylibrary.length==0 && this.state.searchheader==false &&(<div style={{textAlign:'center',display: 'block'}} className="row">
               
                <span>Thank you for signing up with us. We have received your details and will be following up with you shortly to activate your account.</span>

              </div>)}
              {this.props.myLibrary.mylibrary.length>0 &&(<div className="row">
                {this.props.myLibrary.mylibrary.map((item,index) =>{
                  return(
                    <div className="col-xl-3 col-lg-4 col-md-6" key={item.id}>
                      <a onClick={() =>{ this.onItemClick(item.id) }} className="each-class">
                        <div className="class-banne-wrap">
                          <img src={item.thumbnail} className="img-fluid class-banner" />
                        </div>
                        <h3>{item.name}</h3>
                        <p>{this.trimm(item.description)}</p>
                      </a>
                    </div>)
                })}
                

              </div>)}
             </div>:<div className="classesList">
              <div className="row"> <div className="loader"><Spin indicator={antIcon} /></div> </div>
            </div>}
          </div>
         </div>
      );
   }
}


function mapStateToProps(state){
  return{
    userData:state.userData,
    auth:state.auth,
    myLibrary:state.myLibrary,
    myLibraryquery:state.myLibraryquery
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ getMylibrary:getMylibrary, setMylibraryquery:setMylibraryquery }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MyLibrary);