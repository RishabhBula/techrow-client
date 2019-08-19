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

import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

import {getAuthentication} from './actions/authentication'
import Home from './CommonPages/Containers/Home';
import Login from './CommonPages/Containers/Login';
import SignUp from './CommonPages/Containers/SignUp';
import OrderBundle from './CommonPages/Containers/OrderBundle';

import Dashboard from './Client/Containers/Dashboard';
import Header from './Client/Components/Header';

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
              </div>
   				)
   	}else if(this.props.auth.loaded==true && this.props.auth.auth==false){
   		route=(
   				<div>
   					<Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/orderbundle" component={OrderBundle} />
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