import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import 'antd/dist/antd.css'
import './css/slick.css';
import './css/animate.css';
import './css/bootstrap.min.css';
import './css/temp.css';
import './css/style.css';

import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

import {getAuthentication} from './actions/authentication'
import Home from './CommonPages/Containers/Home';
import Login from './CommonPages/Containers/Login';
import SignUp from './CommonPages/Containers/SignUp';
import OrderBundle from './CommonPages/Containers/OrderBundle';

import Dashboard from './Client/Containers/Dashboard';
import Header from './Client/Components/Header';
import Class from './Client/Containers/Class';

//==============firebase connection==============//

import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCEbqRejmMFeaPFtGPR9gK6zUKYIJqJeF8",
  authDomain: "hk-project-0.firebaseapp.com",
  databaseURL: "https://hk-project-0.firebaseio.com",
  projectId: "hk-project-0",
  storageBucket: "hk-project-0.appspot.com",
  messagingSenderId: "129701118966",
  appId: "1:129701118966:web:422c5d5f8b930a14"
};

firebase.initializeApp(firebaseConfig);

//==============firebase connection==============//

class App extends Component{
	constructor(props){
		super(props)
		this.state={

		}
	}
	componentWillMount(){
		this.props.getAuthentication()
	}
  componentDidMount(){

  }
   render(){
   	let route=""
   	if(this.props.auth.loaded==true && this.props.auth.auth==true){
   		
   			route=(
              <div>
                 <Header/>
                 <Route exact path="/" component={Dashboard} />
           			 <Route exact path="/class/:id/:mode" component={Class} />
                 <Route exact path="/orderbundle" component={OrderBundle} />
              </div>
   				)
   	}else if(this.props.auth.loaded==true && this.props.auth.auth==false){
   		route=(
   				<div>
   					<Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
   				</div>

   			)
   	}else{
   		route=<div><Spin indicator={antIcon} /></div>
   	} 
      return( 
         <Router>
	         <div>
	         	
	         	{route}

	         </div>
         </Router> 
      );
   }
}

function mapStateToProps(state){
  return{
    auth:state.auth
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({getAuthentication:getAuthentication}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);