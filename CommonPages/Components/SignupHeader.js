import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {getAuthentication} from '../../actions/authentication'

class SignupHeader extends Component{
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
             {this.props.props.match.path=="/redirect" &&(<a onClick={() =>{ this.props.getAuthentication(); window.location.href="#/" }} className="logo"><img src="../images/techrow-logo.png"/> </a>)}
             {this.props.props.match.path=="/signup" &&(<a onClick={() =>{ this.props.getAuthentication(); window.location.href="#/" }} className="logo"><img src="../images/techrow-logo.png"/> </a>)}
             {this.props.props.match.path=="/orderbundle" &&(<a className="logo"><img src="../images/techrow-logo.png"/> </a>)}
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
export default connect(mapStateToProps, matchDispatchToProps)(SignupHeader);