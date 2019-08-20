import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import {getAuthentication} from '../../actions/authentication'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

class Header extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }

  signout(){
    firebase.auth().signOut()
    .then(() =>{
      window.location.href="#/";
      this.props.getAuthentication()
    })
    .catch((error) =>{
      // An error happened.
    })
  }

  render(){
      return(
         <header className="navbar fixed-top">
            <div className="container-fluid">
              <a onClick={() =>{ window.location.href="#/" }} className="logo"><img src="../images/techrow-logo.png"/> </a>
              <a onClick={() =>{ this.signout() }} className="logo">Sign Out</a>
            </div>
        </header>
      );
   }
}


function mapStateToProps(state){
  return{
    
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ getAuthentication:getAuthentication }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Header);