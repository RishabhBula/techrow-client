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
                            <form>
                            <div className="form-group">
                              <label>username</label>
                              <input id="username" type="username" className="form-control" placeholder="username" value={this.state.username} onChange={(e) =>this.setState({username:e.target.value})}/><br/>
                            </div>
                            <div className="form-group">
                              <label>password</label>
                              <input id="password" type="password" className="form-control" placeholder="password" value={this.state.password} onChange={(e) =>this.setState({password:e.target.value})}/><br/>
                            </div>
                            <div className="form-group">
                              <a>forgot password</a>
                              <button className="green-btn">Login</button>
                            </div>
                            </form>
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
  return bindActionCreators({ }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Login);