import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

class HomeHeader extends Component{
	constructor(props){
		super(props);
    this.state = {
      menuClass :false
      
    }
	}
  menuOpen(){
    this.setState({
      menuClass:!this.state.menuClass
    });
  }
  
  componentDidMount(){
      
  }

  render(){
      return(
              <header className="navbar fixed-top">
                <div className="container-fluid">
                  <a href="#" className="logo"><img src="../images/techrow-logo.png"/> </a>
                  <div className={this.state.menuClass?'openMenu head-right':'head-right'}>
                    <ul>
                      <li><a  href="#">About</a></li>
                      <li><a  href="#">Features</a></li>
                      <li><a  href="#">Blog</a></li>
                      <li><a  href="#">Contact</a></li>
                      <li><a  href="#">Publishers</a></li>
                    </ul>
                    <ul>
                      <li className="login"> <a href="#/login">Login</a></li>
                      <li><a href="#/signup" className="blue-btn">Sign Up</a></li>
                    </ul>
                  </div>
                </div><menu onClick={() => this.menuOpen()}>Menu</menu>
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
export default connect(mapStateToProps, matchDispatchToProps)(HomeHeader);