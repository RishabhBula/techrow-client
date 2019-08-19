import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import SignupHeader from '../Components/SignupHeader';
import SignUp1 from '../Components/SignUp1';
import SignUp2 from '../Components/SignUp2';
import SignUp3 from '../Components/SignUp3';
import SignUp4 from '../Components/SignUp4';

class SignUp extends Component{
	constructor(props){
		super(props);
    this.state = {
      page:1,
    }
	}
  
  componentDidMount(){
      
  }

  pageRender(p){
      this.setState({page:p})
  }

  render(){
      return(
        <div>
           <SignupHeader/>
           <div style={{height: '800px'}} className="row"> 
              <div className="col-3" style={{backgroundColor: 'Blue'}}>
                  <span>Signup your account</span><br/>
                  <span>Questions?</span><br/>
                  <span>Contact Us</span><br/>
              </div>
              <div className="col-9" style={{backgroundColor: '#f1f8ff'}}>
                  <div>
                        <h4>Sign Up</h4>
                        {this.state.page==1 && (<SignUp1 pageRender={this.pageRender.bind(this)} />)}
                        {this.state.page==2 && (<SignUp2 pageRender={this.pageRender.bind(this)} />)}
                        {this.state.page==3 && (<SignUp3 pageRender={this.pageRender.bind(this)} />)}
                        {this.state.page==4 && (<SignUp4 pageRender={this.pageRender.bind(this)} />)}
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
export default connect(mapStateToProps, matchDispatchToProps)(SignUp);