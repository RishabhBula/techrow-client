import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

class MyLibrary extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }


  render(){
      return(
         <div className="dashboard">
          <div>
            <h2>My Library</h2>
            <div className="search form-group">
              <input type="text" className="form-control" placeholder="Search Classes" />
              <button><img src="../images/search-icon.png" className="img-fluid"/></button>
            </div>
            <div className="classesList">
              <div className="row">
                <div className="col-lg-3 col-md-4">
                  <a href="#/class" className="each-class">
                    <div className="class-banne-wrap">
                      <img src="../images/class-image.jpg" className="img-fluid class-banner" />
                    </div>
                    <h3>Lorem Ipsum Sit Dolor - amet Specialization</h3>
                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </p>
                  </a>
                </div>
                <div className="col-lg-3 col-md-4">
                  <a href="#" className="each-class">
                    <div className="class-banne-wrap">
                      <img src="../images/class-image.jpg" className="img-fluid class-banner" />
                    </div>
                    <h3>Lorem Ipsum Sit Dolor - amet Specialization</h3>
                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </p>
                  </a>
                </div>
                <div className="col-lg-3 col-md-4">
                  <a href="#" className="each-class">
                    <div className="class-banne-wrap">
                      <img src="../images/class-image.jpg" className="img-fluid class-banner" />
                    </div>
                    <h3>Lorem Ipsum Sit Dolor - amet Specialization</h3>
                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </p>
                  </a>
                </div>
                <div className="col-lg-3 col-md-4">
                  <a href="#" className="each-class">
                    <div className="class-banne-wrap">
                      <img src="../images/class-image.jpg" className="img-fluid class-banner" />
                    </div>
                    <h3>Lorem Ipsum Sit Dolor - amet Specialization</h3>
                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </p>
                  </a>
                </div>
                <div className="col-lg-3 col-md-4">
                  <a href="#" className="each-class">
                    <div className="class-banne-wrap">
                      <img src="../images/class-image.jpg" className="img-fluid class-banner" />
                    </div>
                    <h3>Lorem Ipsum Sit Dolor - amet Specialization</h3>
                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </p>
                  </a>
                </div>
                <div className="col-lg-3 col-md-4">
                  <a href="#" className="each-class">
                    <div className="class-banne-wrap">
                      <img src="../images/class-image.jpg" className="img-fluid class-banner" />
                    </div>
                    <h3>Lorem Ipsum Sit Dolor - amet Specialization</h3>
                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </p>
                  </a>
                </div>
                <div className="col-lg-3 col-md-4">
                  <a href="#" className="each-class">
                    <div className="class-banne-wrap">
                      <img src="../images/class-image.jpg" className="img-fluid class-banner" />
                    </div>
                    <h3>Lorem Ipsum Sit Dolor - amet Specialization</h3>
                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </p>
                  </a>
                </div>
                <div className="col-lg-3 col-md-4">
                  <a href="#" className="each-class">
                    <div className="class-banne-wrap">
                      <img src="../images/class-image.jpg" className="img-fluid class-banner" />
                    </div>
                    <h3>Lorem Ipsum Sit Dolor - amet Specialization</h3>
                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium </p>
                  </a>
                </div>
                

              </div>
            </div>
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
  return bindActionCreators({  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MyLibrary);