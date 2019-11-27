import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import AnchorLink from 'react-anchor-link-smooth-scroll';

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
                  <a onClick={() =>{ window.location.href='#/'; }} className="logo"><img src="../images/techrow-logo.png"/> </a>
                  <div className={this.state.menuClass?'openMenu head-right':'head-right'}>
                    <ul>
                      <li className={this.props.activeHeader=="home" ?"active":""}><AnchorLink href='#about_us'>About</AnchorLink></li>
                      <li className={this.props.activeHeader=="feature" ?"active":""} onClick={() =>{ window.location.href='#/features'; }}><a>Features</a></li>
                      <li><AnchorLink href='#contact_us'>Contact</AnchorLink></li>
                      <li><a  href="http://www.techrowfund.org" target="_blank">TechRow Fund</a></li>
                    </ul>
                    <ul>
                      <li className="login"> <a href="#/login">Login</a></li>
                      <li><a href="#/signup" className="blue-btn">Sign Up</a></li>
                    </ul>
                  </div>
                </div><menu className={this.state.menuClass?'menu-open':''} onClick={() => this.menuOpen()}><span></span></menu>
             </header>
      );
   }
}


function mapStateToProps(state){
  return{
    activeHeader:state.activeHeader.head
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(HomeHeader);