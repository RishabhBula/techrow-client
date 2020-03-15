import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactGA from 'react-ga';

import HomeHeader from '../Components/HomeHeader';
import {setActiveHeader} from '../../actions/setActiveHeader';
import {Notification} from '../../CommonPages/Components/Notification';

class Blog extends Component{
	constructor(props){
		super(props);
    this.state = {
      newsletter:false,
      error:false,
      errortext:"",
      buttonloader:false,
    }
	}

  componentWillMount(){
      ReactGA.initialize('UA-83014470-1');
      ReactGA.pageview(window.location.href)
  }

  componentDidMount(){
      this.props.setActiveHeader("blog")
      window.scrollTo(0,0);
  }

  render(){
      return(
        <div className="full-page animated fadeIn blog-page">
           <HomeHeader/>
            <section className="about-this banner">
              <div className="container cnt-area">
                <div className="row">
                  <div className="col-md-6 cnt-area-lft">
                    <h2>Blog Page</h2>
                    <p>
                    Hello This is a blog page
                    </p>
                  </div>
                </div>
              </div>
            </section>
        </div>
      );
   }
}


function mapStateToProps(state){
  return{

  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setActiveHeader:setActiveHeader }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Blog);
