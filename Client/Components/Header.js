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



  render(){
    const menu = (
        <Menu>
          <Menu.Item>
            <a href="#/">
              Settings
            </a>
          </Menu.Item>
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
              <a onClick={() =>{ window.location.href="#/" }} className="logo"><img src="../images/techrow-logo.png"/> </a>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  <img src="../images/home-demo-photo-2c.png"/> {this.props.userData.school.name} <Icon type="down" />
                </a>
              </Dropdown>
              
            </div>
        </header>
      );
   }
}


function mapStateToProps(state){
  return{
    userData:state.userData
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ getAuthentication:getAuthentication }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Header);