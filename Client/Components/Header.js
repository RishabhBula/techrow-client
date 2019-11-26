import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Menu, Dropdown, Icon } from 'antd';

import {getAuthentication} from '../../actions/authentication'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

class Header extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }

  signout(){
    firebase.auth().signOut()
    .then(() =>{
      window.location.href="#/";
      this.props.getAuthentication()
    })
    .catch((error) =>{
      // An error happened.
    })
  }

  header(){
    if(this.props.classMode.route=="")
      return "My Library"
    if(this.props.classMode.route=="class")
      return "Classes"
    if(this.props.classMode.route=="marketplace")
      return "Marketplace"
  }



  render(){
    const menu = (
        <Menu>
          {/*<Menu.Item>
            <a href="#/">
              Settings
            </a>
          </Menu.Item>*/}
          <Menu.Item>
            <a onClick={() =>{ this.signout() }} className="logo">
              Sign Out
            </a>
          </Menu.Item>
        </Menu>
      );
      return(
         <header className="navbar fixed-top">
            <div className="container-fluid">
              <div className="header-menu">
                <a onClick={() =>{ window.location.href="#/" }} className="logo"><img src="../images/techrow-logo.png"/> </a>
                <a > <Icon type="caret-right" />{this.header()}</a>
              </div>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  <img src="../images/dummy-avatar.jpg" style={{borderRadius: 25}}/> {this.props.userData.organization.orgName} <Icon type="down" />
                </a>
              </Dropdown>
              
            </div>
        </header>
      );
   }
}


function mapStateToProps(state){
  return{
    userData:state.userData,
    classMode:state.classMode

  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ getAuthentication:getAuthentication }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Header);