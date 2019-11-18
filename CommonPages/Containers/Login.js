import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {notification} from 'antd';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

import {getAuthentication} from '../../actions/authentication'

import LoginHeader from '../Components/LoginHeader';
import {Notification} from '../Components/Notification';

class Login extends Component{
	constructor(props){
		super(props);
    this.state = {
      email:"",
      password:"",
      forgotstate:false,
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  login(email,password){
      // console.log("====login",email,password)
      if(this.state.email=="" || this.state.password==""){
        this.setState({error:true,errortext:"Please fill in all fields to continue"})
      }else{
                
                const db=firebase.firestore()
                db.collection('users').where("email","==",this.state.email.toLocaleLowerCase()).get()
                .then((querySnapshot) => {
                    if (querySnapshot.size>0) {
                          if(querySnapshot.docs[0].data().status){
                              firebase.auth().signInWithEmailAndPassword(email.trim().toLocaleLowerCase(), password.trim())
                              .then((res) =>{
                                // console.log("====login",res)
                                this.props.getAuthentication();
                                window.location.href="#/";
                              })
                              .catch((error) =>{
                                // Handle Errors here.
                                console.log("====error",error)
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                if(error.code=="auth/wrong-password"){
                                  Notification("error","Login Failed","Email and password do not match.")
                                }else{
                                  Notification("error",error.code.split("/")[1],error.message)
                                }
                                // ...
                              })
                          }else{
                              Notification("error","Deactivated","Your account has been deactivated by admin")
                          }
                    }else{
                        Notification("error","User Not Found","There is no user record corresponding to this identifier")
                    }
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });

      }
      
  }

  forgot(email){
      if(this.state.email==""){
        this.setState({error:true,errortext:"Please enter email to continue"})
      }else{
        firebase.auth().sendPasswordResetEmail(email.trim().toLocaleLowerCase(),{url:'https://techrow-platform.firebaseapp.com/#/login'})
        .then((res) =>{
          console.log("forgot success response",res)
          Notification("success","Email sent","Reset password link sent to your email")
          this.setState({forgotstate:false,password:""})
          // Email sent.
        })
        .catch((error) =>{
          console.log("forgot error response",error)
          Notification("error",error.code.split("/")[1],error.message)
          // An error happened.
        })
      }
  }

  render(){
      return(
        <div className="full-page">
           <LoginHeader/>
           <div className="inner-wrap"> 
                <div className="inner-blue-menu">
                    {this.state.forgotstate==false && (<h1>Login your<br/> account</h1>)}
                    {this.state.forgotstate==true && (<h1>Forgot password</h1>)}
                    <div>
                      <h3>Questions?</h3>
                      <a>< img src="../images/contact-icon.png" className="img-fluid"/>Contact Us</a>
                    </div>
                </div>
                <div className="inner-right-wrap">
                    
                {this.state.forgotstate==false && (<div className="animated fadeIn">
                        <h4>User Login</h4>
                          <div className="form-wrap">
                            <div className="form">
                              <div className="form-group">
                                <label>User Name</label>
                                <input id="email" className="form-control" placeholder="Your username" value={this.state.email} onChange={(e) =>this.setState({email:e.target.value,error:false,errortext:""})} onKeyPress={(event) =>{ if(event.keyCode == 13 || event.which == 13){ this.login(this.state.email,this.state.password) } }}/><br/>
                              </div>
                              <div className="form-group">
                                <label>password</label>
                                <input id="password" type="password" className="form-control" placeholder="Type your password" value={this.state.password} onChange={(e) =>this.setState({password:e.target.value,error:false,errortext:""})} onKeyPress={(event) =>{ if(event.keyCode == 13 || event.which == 13){ this.login(this.state.email,this.state.password) } }}/><br/>
                              </div>
                              {this.state.error==true && (<div className="form-group"><span style={{color: 'red'}}>{this.state.errortext}</span></div>)}
                              <div className="form-group">
                                <a style={{fontSize:'12px'}} onClick={() =>{ this.setState({ forgotstate:true, password:"",error:false,errortext:"" }) }}>Forgot Password</a>
                                <button className="green-btn" onClick={() =>{ this.login(this.state.email,this.state.password) }}>Login</button>
                              </div>
                            </div>
                            <div className="login-btm">
                              <span>Don't have an account? <a href="#/signup">Sign up here</a></span>
                            </div>
                          </div>
                       </div>)}
                 {this.state.forgotstate==true && (<div className="animated fadeIn">
                        <h4>Forgot Password</h4>
                          <div className="form-wrap">
                            <div className="form">
                              <div className="form-group">
                                <label>email</label>
                                <input id="email" type="email" className="form-control" placeholder="email" value={this.state.email} onChange={(e) =>this.setState({email:e.target.value,error:false,errortext:""})} onKeyPress={(event) =>{ if(event.keyCode == 13 || event.which == 13){ this.forgot(this.state.email) } }}/><br/>
                              </div>
                              {this.state.error==true && (<div className="form-group"><span style={{color: 'red'}}>{this.state.errortext}</span></div>)}
                              <div className="form-group">
                                <a  style={{fontSize:'12px'}}  onClick={() =>{ this.setState({ forgotstate:false, password:"" }) }}>Sign In</a>
                                <button className="green-btn" onClick={() =>{ this.forgot(this.state.email) }}>Send</button>
                              </div>
                            </div>
                            <div className="login-btm">
                              <span>Don't have an account? <a href="#/signup">Sign up here</a></span>
                            </div>
                          </div>
                       </div>)}
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