import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

import SignupHeader from '../Components/SignupHeader';
import {Notification} from '../Components/Notification';

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_+])(?=.{6,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

class Redirect extends Component{
	constructor(props){
		super(props);
    this.state = {
      mode:"",
      oobCode:"",
      apiKey:"",
      continueUrl:"",

      password:"",
      resetSuccess:false,
      error:false,
      errortext:""
    }
	}
  
  componentWillMount(){
      const params = new URLSearchParams(this.props.location.search); 
      const mode = params.get('mode');
      const oobCode = params.get('oobCode');
      const apiKey = params.get('apiKey');
      const continueUrl = params.get('continueUrl');
      console.log("======mode",mode)
      console.log("======oobCode",oobCode)
      console.log("======apiKey",apiKey)
      console.log("======continueUrl",continueUrl)
      this.setState({mode:mode, oobCode:oobCode, apiKey:apiKey, continueUrl:continueUrl})
  }

  handleResetPassword() {
    if(this.state.password==""){
      this.setState({error:true,errortext:"Please enter a password to continue"})
    }else if(!strongRegex.test(this.state.password)){
      this.setState({error:true,errortext:"password strength not good."})
    }else{
        // Localize the UI to the selected language as determined by the lang
        // parameter.
        var accountEmail;
        // Verify the password reset code is valid.
        firebase.auth().verifyPasswordResetCode(this.state.oobCode).then((email) => {
          var accountEmail = email;
          console.log("accountEmail",accountEmail)
          // TODO: Show the reset screen with the user's email and ask the user for
          // the new password.

          // Save the new password.
          firebase.auth().confirmPasswordReset(this.state.oobCode, this.state.password).then((resp) => {
            console.log("confirmPasswordReset",resp)
            this.setState({resetSuccess:true,password:""})
            // Password reset has been confirmed and new password updated.

            // TODO: Display a link back to the app, or sign-in the user directly
            // if the page belongs to the same domain as the app:
            // auth.signInWithEmailAndPassword(accountEmail, newPassword);

            // TODO: If a continue URL is available, display a button which on
            // click redirects the user back to the app via continueUrl with
            // additional state determined from that URL's parameters.
          }).catch((error) => {
            console.log("2error",error)
            Notification("error",error.code.split("/")[1],error.message)
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
          });
        }).catch((error) => {
          console.log("1error",error)
          Notification("error",error.code.split("/")[1],error.message)
          // Invalid or expired action code. Ask user to try to reset the password
          // again.
        });
    }
  }

  render(){
      return(
        <div className="full-page">
           <SignupHeader/>
           <div className="inner-wrap">
              <div style={{marginRight: '300px'}} className="inner-right-wrap">

                  {this.state.mode=="resetPassword" &&(
                     <div className="animated fadeIn">
                        <h4>Reset password</h4>
                          {this.state.resetSuccess==false ? 
                            <div className="form-wrap">
                                <div className="form">
                                  <div className="form-group">
                                      <label>New password</label>
                                      <input id="password" type="password" className="form-control" placeholder="Enter a strong password" value={this.state.password} onChange={(e) => {this.setState({password:e.target.value.trim(),error:false,errortext:""}); }}/>
                                  </div>
                                  {this.state.password!="" && (
                                    <div className="pass-strength">
                                      <div className="pass-strength-tile" style={{backgroundColor: '#FF0400'}}></div>
                                      {mediumRegex.test(this.state.password) && (<div  className="pass-strength-tile" style={{backgroundColor: '#E59C1D'}}></div>)}
                                      {strongRegex.test(this.state.password) && (<div  className="pass-strength-tile" style={{backgroundColor: '#B1F543'}}></div>)}
                                      {mediumRegex.test(this.state.password)==false && strongRegex.test(this.state.password)==false && (<b>Weak</b>)}
                                      {mediumRegex.test(this.state.password)==true && strongRegex.test(this.state.password)==false && (<b>Medium</b>)}
                                      {strongRegex.test(this.state.password) && (<b>Strong</b>)}
                                      <br/><span className="about-password">At least 6 characters including uppercase, lowercase, number and symbol</span>
                                    </div>
                                    )}
                                  {this.state.error==true && (<div><span style={{color: 'red'}}>*{this.state.errortext}</span></div>)}
                                  <div className="form-group">
                                    <button className="green-btn" onClick={() =>{ this.handleResetPassword() }}>Reset</button>
                                  </div>
                                </div>
                            </div>:
                            <div className="form-wrap">
                                <div className="form">
                                  <div className="form-group">
                                    <h4>Password Reset Successfully</h4>
                                  </div>
                                  <div style={{textAlign:'center', marginTop: '50px'}} className="form-group">
                                    <span className="green-btn" onClick={() =>{ window.location.href="#/login" }}>Continue to Login</span>
                                  </div>
                                </div>
                            </div>}
                     </div>
                  )}

                  {this.state.mode=="" &&(
                    <div className="form-wrap">
                      <div className="form">
                        <div><Spin indicator={antIcon} /></div>
                      </div>
                    </div>
                  )}

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
  return bindActionCreators({ }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Redirect);