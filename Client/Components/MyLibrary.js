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
      mylibrary:[]
    }
	}
  
  componentDidMount(){
      this.mylibrary()
  }

  async mylibrary(){
      try {
          let myLibrary =[];
          let library = await firebase.firestore().collection('users').doc(this.props.auth.authData.uid).collection('myLibrary').get()
          console.log("library",library.size)
                        await library.forEach((item) =>{
                                myLibrary.push(item.data())
                              })
          console.log("myLibrary",myLibrary)
          this.props.getMylibrary(myLibrary)
          return myLibrary

        }
        catch (err) {
            console.log("Error", err)
            return err
        }
  }

  onItemClick(id){
    window.location.href='#/class/:'+id+'/:theater'
  }


  render(){
      return(
         <div className="dashboard animated fadeIn">
          <div>
            <h2>My Library</h2>
            <div className="search form-group">
              <input type="text" className="form-control" placeholder="Search Classes" />
              <button><img src="../images/search-icon.png" className="img-fluid"/></button>
            </div>
            <div className="classesList">
              {this.props.myLibrary.length==0 &&(<div className="row">
                {this.state.data.map((item,index) =>{
                  return(
                    <div className="col-lg-3 col-md-4">
                      <a onClick={() =>{ this.onItemClick(item.id) }} className="each-class">
                        <div className="class-banne-wrap">
                          <img src="../images/class-image.jpg" className="img-fluid class-banner" />
                        </div>
                        <h3>{item.shortdisc}</h3>
                        <p>{item.longdisc}</p>
                      </a>
                    </div>)
                })}
                

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
            </div>
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