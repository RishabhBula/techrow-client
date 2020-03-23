import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import {setScrollHeader} from '../../actions/setScrollHeader';

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

  // scrollTo(scroll){
  //   setTimeout(() =>{
  //   var elmnt = document.getElementById(scroll);
  //   if(elmnt)
  //   elmnt.scrollIntoView({behavior: 'smooth'})
  //   },100)
  // }
  //--Or u can call this function insted of this.props.setScrollHeader("****") action

  render(){
      return(
              <header className="navbar fixed-top">
                <div className="container-fluid">
                  <a onClick={() =>{ window.location.href='#/'; }} className="logo"><img src="../images/techrow-logo.png"/> </a>
                  <div className={this.state.menuClass?'openMenu head-right':'head-right'}>
                    <ul>
                      <li onClick={() =>{ this.props.setScrollHeader("banner") }} className={this.props.activeHeader=="home" ?"active":""}><a href="#/">Home</a></li>
                      <li onClick={() =>{ this.props.setScrollHeader("about") }}><a href='#/'>About</a></li>
                      <li className={this.props.activeHeader=="feature" ?"active":""}><a href="#/features">Features</a></li>
                      <li><a href="http://www.techrowfund.org" target="_blank">TechRow Fund</a></li>
                      <li onClick={() =>{ this.props.setScrollHeader("contact") }}><a href="#/">Contact</a></li>
                      <li className={this.props.activeHeader=="blog" ?"active":""}><a href="#/blog">Blog</a></li>
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
  return bindActionCreators({ setScrollHeader:setScrollHeader }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(HomeHeader);
