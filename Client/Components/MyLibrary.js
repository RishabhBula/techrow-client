import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import {getMylibrary} from '../../actions/getMylibrary';

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
      data :[
              {id:"123",shortdisc:"Lorem Ipsum Sit Dolor - amet Specialization",longdisc:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"},
              {id:"456",shortdisc:"Lorem Ipsum Sit Dolor - amet Specialization",longdisc:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"},
              {id:"789",shortdisc:"Lorem Ipsum Sit Dolor - amet Specialization",longdisc:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"},
              {id:"987",shortdisc:"Lorem Ipsum Sit Dolor - amet Specialization",longdisc:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"},
              {id:"654",shortdisc:"Lorem Ipsum Sit Dolor - amet Specialization",longdisc:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"},
              {id:"321",shortdisc:"Lorem Ipsum Sit Dolor - amet Specialization",longdisc:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"},
            ],
      mylibrary:[],
      search:"",
      searchheader:false,
      searcharray:[],
      loading:false
    }
	}
  
  componentDidMount(){
      this.mylibrary()
  }

  async mylibrary(){
      try {
          this.setState({loading:true})
          let myLibrary =[];
          // let library = await firebase.firestore().collection('users').doc(this.props.auth.authData.uid).collection('myLibrary').get()
          let library = await firebase.firestore().collection('contents').get()
          console.log("library",library.size)
                        await library.forEach((item) =>{
                                myLibrary.push(item.data())
                              })
          console.log("myLibrary",myLibrary)
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
    window.location.href='#/class/:'+id+'/:theater'
  }

  search(s){
    console.log("this.state.search",this.state.search)
    // firebase.firestore().collection('users').doc(this.props.auth.authData.uid).collection('myLibrary').where('name', '>=', s).where('name', '<=', s+ '\uf8ff')
    firebase.firestore().collection('contents').where('searchQuery', '>=', s).where('searchQuery', '<=', s+ '\uf8ff')
    .get()
    .then((querySnapshot) => {
        let myLibrary =[];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            myLibrary.push(doc.data())
        });
        this.props.getMylibrary(myLibrary)
        if(this.state.search==""){ this.setState({searchheader:false}) }else{ this.setState({searchheader:true}) }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  search2(event){
      if (event.keyCode == 13 || event.which == 13){
                    this.search(this.state.search);
                }
  }


  render(){
      return(
         <div className="dashboard animated fadeIn">
          <div>
            {this.state.searchheader==false?<h2>My Library</h2>:<h2>Search Results</h2>}
            <div className="search form-group">
              <input type="text" className="form-control" placeholder="Search in my library" value={this.state.search} onChange={(e) =>{ this.setState({search:e.target.value}); if(e.target.value==""){this.search(e.target.value)} }} onKeyPress={(event) =>{ this.search2(event) }} />
              <button onClick={() =>{ this.search(this.state.search) }}><img src="../images/search-icon.png" className="img-fluid"/></button>
            </div>
            {this.state.loading==false ? <div className="classesList">
              {this.props.myLibrary.length==0 &&(<div style={{textAlign:'center',display: 'block'}} className="row">
               
                <span>No results found.!</span>

              </div>)}
              {this.props.myLibrary.length>0 &&(<div className="row">
                {this.props.myLibrary.map((item,index) =>{
                  return(
                    <div className="col-lg-3 col-md-4">
                      <a onClick={() =>{ this.onItemClick(item.id) }} className="each-class">
                        <div className="class-banne-wrap">
                          <img src={item.thumbnail} className="img-fluid class-banner" />
                        </div>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
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
    myLibrary:state.myLibrary.mylibrary
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ getMylibrary:getMylibrary }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MyLibrary);