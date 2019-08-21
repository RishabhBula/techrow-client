import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

import {getAuthentication} from '../../actions/authentication'

import LoginHeader from '../Components/LoginHeader';

class Login extends Component{
	constructor(props){
		super(props);
    this.state = {
      email:"",
      password:""
    }
	}
  
  componentDidMount(){
      
  }

  login(email,password){
      console.log("====login",email,password)
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) =>{
        console.log("====login",res)
        this.props.getAuthentication();
        window.location.href="#/";
      })
      .catch((error) =>{
        // Handle Errors here.
        console.log("====error",error)
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      })
  }

  render(){
      return(
        <div className="full-page">
           <LoginHeader/>
           <div className="inner-wrap"> 
                <div className="inner-blue-menu">
                    <h1>Login your<br/> account</h1>
                    <div>
                      <h3>Questions?</h3>
                      <a>Contact Us</a>
                    </div>
                </div>
                <div className="inner-right-wrap">
                    
                          <h4>User Login</h4>
                          <div className="form-wrap">
                            <div className="form">
                              <div className="form-group">
                                <label>email</label>
                                <input id="email" type="email" className="form-control" placeholder="email" value={this.state.email} onChange={(e) =>this.setState({email:e.target.value})}/><br/>
                              </div>
                              <div className="form-group">
                                <label>password</label>
                                <input id="password" type="password" className="form-control" placeholder="password" value={this.state.password} onChange={(e) =>this.setState({password:e.target.value})}/><br/>
                              </div>
                              <div className="form-group">
                                <a>forgot password</a>
                                <button className="green-btn">Login</button>
                              </div>
                            </div>
                            <span>Don't have an account? <a href="#/signup">Sign up here</a></span>
                          </div>
                </div>
             </div>
        </div>
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
export default connect(mapStateToProps, matchDispatchToProps)(Login);