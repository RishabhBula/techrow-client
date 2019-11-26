import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import HomeHeader from '../Components/HomeHeader';

class Features extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }

  render(){
      return(
        <div className="full-page animated fadeIn features-page">
           <HomeHeader/>
            
            <section className="about-this banner">
              <div className="container cnt-area">
                <div className="row">
                  <div className="col-md-6 about-cnt-rt">
                    <img src="./images/class-room.jpg" className="img-fluid" alt="vr"/>
                  </div>
                  <div className="col-md-6 cnt-area-lft">
                    <h2>Classroom Setup</h2>
                    <p>An extensive educational library of immersive content covering a range of subjects from science to current events coupled with cutting edge VR headsets providing students with a truly immersive learning experience.</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="about-this">
              <div className="container cnt-area">
                <div className="row">
                  <div className="col-md-6 cnt-area-lft">
                    <h2><span>Unlock</span>Marketplace</h2>
                    <p>An entire eco-system of world class educational immersive content to enrich your classrooms with 21st century learning solutions. Content on the platform has been carefully curated to meet the needs of today's educators.</p>
                    
                  </div>
                  <div className="col-md-6 about-cnt-rt">
                    <img src="./images/marketplace.png" className="img-fluid" alt="vr"/>
                  </div>
                </div>
              </div>
            </section>
            <section className="about-this" style={{backgroundColor:'#fbfbfb'}}>
              <div className="container cnt-area">
                <div className="row">
                  <div className="col-md-6 about-cnt-rt">
                    <img src="./images/class-room-mode.png" className="img-fluid" alt="vr"/>
                  </div>                  
                  <div className="col-md-6 cnt-area-lft">
                    <h2><span>Experience</span>Classroom mode</h2>
                    <p>Teachers have full control of the entire learning experience from end to end. By triggering classroom mode, students will view only what the teacher requires driving maximum focus, while maximizing teaching time.</p>
                  </div>
                </div>
              </div>
            </section>
        
   
            <section className="contact-us">
              <div className="container">
                <div className="row">
                  <div className="col-md-7">
                    <h2>Have a question? Contact us!</h2>
                    <div className="form">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name"/>
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email"/>
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Subject"/>
                      </div>
                      <div className="form-group">
                        <textarea type="text" className="form-control" placeholder="Message...."></textarea>
                      </div>
                      <div className="form-group checkbox">
                        <label><input type="checkbox" value=""/>Receive our TechRow newsletter</label>
                      </div>
                      <div className="form-group">
                        <button>Submit</button>
                      </div>
                      
                    </div>
                  </div>
                  <div className="col-md-5">
                    <h3>Quick Links</h3>
                    <ul>
                      <li><a href="#">Features</a></li>
                      <li><a href="#/signup">Sign Up</a></li>
                      <li><a href="#/login">Sign In</a></li>
                    </ul>
                    
                  </div>
                </div>

              </div>
            </section>
            <footer>
              <div className="container">
                <div className="footer-content">
                  <copyright>© 2019 All Rights Reserved</copyright>
                  <a href="#"><img src="../images/techrow-logo.png" className="img-fluid logo"  alt="techrow-logo" /></a>
                  <div className="social-links">
                    <a href="#"><img src="../images/instagram-icon.png" className="img-fluid"/></a>
                    <a href="https://www.facebook.com/TechRow-514597378749347" target="_blank"><img src="../images/facebook-icon.png" className="img-fluid"/></a>
                    <a href="https://twitter.com/techrownyc" target="_blank"><img src="../images/twitter-icon.png" className="img-fluid"/></a>
                  </div>
                </div>
              </div>
            </footer>
        </div>
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
export default connect(mapStateToProps, matchDispatchToProps)(Features);