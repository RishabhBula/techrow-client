import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

class LoginHeader extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }

  render(){
      return(
         
         <header className="navbar fixed-top">
            <div className="container-fluid">
              <a onClick={() =>{ window.location.href="#/" }} className="logo"><img src="../images/techrow-logo.png"/> </a>
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
  return bindActionCreators({ }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(LoginHeader);