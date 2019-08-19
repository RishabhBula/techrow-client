import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import LoginHeader from '../Components/LoginHeader';

class Login extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }

  render(){
      return(
        <div className="full-page">
           <LoginHeader/>
           <div style={{height: '800px'}} className="row"> 
              <div className="col-3" style={{backgroundColor: 'Blue'}}>
                  <span>Login your account</span><br/>
                  <span>Questions?</span><br/>
                  <span>Contact Us</span><br/>
              </div>
              <div className="col-9" style={{backgroundColor: '#f1f8ff'}}>
                  <div>
                        <h4>User Login</h4>
                        <div style={{backgroundColor: '#fff'}}>
                          <label>username</label><br/>
                          <input id="username" type="username" className="" placeholder="username" value={this.state.username} onChange={(e) =>this.setState({username:e.target.value})}/><br/>
                          <label>password</label><br/>
                          <input id="password" type="password" className="" placeholder="password" value={this.state.password} onChange={(e) =>this.setState({password:e.target.value})}/><br/>
                          <a>forgot password</a>
                          <button>Login</button><br/>
                          <span>Don't have an account? <a href="#/signup">Sign up here</a></span>
                        </div>
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
  return bindActionCreators({ }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Login);