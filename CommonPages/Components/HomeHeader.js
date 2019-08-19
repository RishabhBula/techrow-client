import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

class HomeHeader extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }

  render(){
      return(
         <div className="row" style={{backgroundColor: 'white',display: 'flex',textAlign:'center'}}> 
            <div className="col-6" style={{textAlign: 'left' }}>
              <img style={{width:'100px',height: '30px'}} src="../images/techrow-logo.png"/>
              <a>About</a>
              <a>Features</a>
              <a>blog</a>
              <a>Contact</a>
              <a>Publishers</a>
            </div>
            <div className="col-6" style={{textAlign: 'right' }}>
              <a href="#/login">Login</a>
              <a href="#/signup">Sign Up</a>
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
export default connect(mapStateToProps, matchDispatchToProps)(HomeHeader);