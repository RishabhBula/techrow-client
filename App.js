import React, { Component, Fragment } from 'react';
import * as contentful from 'contentful'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'antd/dist/antd.css'
import './css/slick.css';
import './css/animate.css';
import './css/bootstrap.min.css';
import './css/temp.css';
import './css/style.css';

import { Spin, Icon, notification } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

import { getAuthentication } from './actions/authentication'
import Home from './CommonPages/Containers/Home';
import Features from './CommonPages/Containers/Features';
// Include Blog Class, contentful
import Blog from './CommonPages/Containers/Blog';
import BlogDetail from './CommonPages/Containers/BlogDetail';

import Login from './CommonPages/Containers/Login';
import SignUp from './CommonPages/Containers/SignUp';
import OrderBundle from './CommonPages/Containers/OrderBundle';
import Redirect from './CommonPages/Containers/Redirect';

import Dashboard from './Client/Containers/Dashboard';
import Header from './Client/Components/Header';
import Class from './Client/Containers/Class';
import Marketplace from './Client/Containers/Marketplace';
import MarketplaceDiscription from './Client/Containers/MarketplaceDiscription'

//==============firebase connection==============//

import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import Sidemenu from './Client/Components/Sidemenu';
import TheaterSidemenu from './Client/Components/TheaterSidemenu';

const firebaseConfig = {
  apiKey: "AIzaSyAB1yWXPpiOvXHO4w6SUjhvnAejF-bQ5cs",
  authDomain: "techrow-platform.firebaseapp.com",
  databaseURL: "https://techrow-platform.firebaseio.com",
  projectId: "techrow-platform",
  storageBucket: "techrow-platform.appspot.com",
  messagingSenderId: "630640448823",
  appId: "1:630640448823:web:47ec2a995f0d1c9d70f6b2"
};

firebase.initializeApp(firebaseConfig);

//==============firebase connection==============//

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount() {
    this.props.getAuthentication()
  }
  componentDidMount() {
    // window.addEventListener("offline",(e) => {
    //   console.log("offline")
    // notification.error({
    //   message:'you are offline',
    //   duration:0,
    //   top:100
    // })
    // });

    // // Add event listener online to detect network recovery.
    // window.addEventListener("online",(e) => {
    //   console.log("online")
    // notification.destroy();
    // notification.success({
    //   message:'back in action',
    //   duration:2,
    //   top:100
    // });
    // });
  }
  render() {
    let route;
    if (this.props.auth.loaded == true && this.props.auth.auth == true) {
      route = (
        <Fragment>
          <Header />
          <Switch>
            {/* Pages here will hide the sidemenu when selected */}
            <Route exact path="/marketplace" component={Marketplace} />
            <Route exact path="/marketplace/:id" component={MarketplaceDiscription} />

            <Fragment>
              <div className="full-page">
                <div className="inner-wrap">
                  <Switch>
                    <Route exact path="/class/:id/:mode" render={TheaterSidemenu} />
                    <Route path="/" render={Sidemenu} />
                  </Switch>
                  <div className="inner-right-wrap">
                    {/* Pages here will have the side menu visible when selected */}
                    <Route exact path="/class/:id/:mode" component={Class} />
                    <Route exact path="/" component={Dashboard} />
                  </div>
                </div>
              </div>
            </Fragment>
          </Switch>
        </Fragment>

      )
    } else if (this.props.auth.loaded == true && this.props.auth.auth == false) {
      // Include Blog Pages in Header, contentful
      route = (
        <Switch>
          <Route exact path="/features" component={Features} />
          <Route exact path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogDetail} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/redirect" component={Redirect} />
          <Route exact path="/" component={Home} />
        </Switch>
      )
    } else {
      route = <div className="loader"><Spin indicator={antIcon} /></div>
    }

    return (
      <Router>
        {route}
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ getAuthentication: getAuthentication }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
