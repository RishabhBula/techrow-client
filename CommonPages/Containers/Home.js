import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import HomeHeader from '../Components/HomeHeader';

class Home extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }

  render(){
      return(
        <div className="full-page">
           <HomeHeader/>
            <section className="home-banner">
              <div className="container">
                <h1>The Power of Immersive Technology</h1>
              </div>
            </section>
            <section className="banner-bottom">
              <div className="container">
                <h2>We are a movement...</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu efficitur est. Suspendisse eget est rutrum, venenatis velit quis, dignissim ex. Mauris elementum nibh semper elit volutpat, et</p>
              </div>
            </section>
            <section className="about-this">
              <div className="container cnt-area">
                <div className="row">
                  <div className="col-md-6 cnt-area-lft">
                    <h2><span>Unlock</span>the Power of Immersive Technology</h2>
                    <p>Experience the ultimate Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. incididunt ut labore et dolore magna aliqua. Ut enim</p>
                    <a href="#">View TECHROW Features →</a>
                    
                  </div>
                  <div className="col-md-6">
                    <img src="./images/vr-girl.jpg" className="img-fluid" alt="vr"/>
                  </div>
                </div>
              </div>
            </section>
            <section className="techrow-platform">
              <div className="container">
                <h4><img src="../images/logo-grey.png" className="img-fluid logo"/>Platform</h4>
                <div className="techrow-works">
                  <img src="../images/techrow-platform.png" className="img-fluid"/>
                </div>
              </div>
            </section>
            <section className="howItWork">
              <div className="container">
                <h2>How it works</h2>
                <img src="../images/how-it-works.png" className="img-fluid how-it-works"/>
                <div className="row">
                  <div className="col-md-6">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim adaes aminim veniam, quis </p>
                  </div>
                  <div className="col-md-6">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnaaliqua. Ut enim adaes aminim veniam, quis </p>
                  </div>
                </div>
                <h2>What You Get</h2>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="works-types">
                      <h3 style={{color:'#F58221'}}>Marketplace</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adaes aminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat </p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="works-types">
                      <h3 style={{color:'#B0F542'}}>Experiences</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adaes aminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat </p>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="works-types">
                      <h3 style={{color:'#FFF200'}}>Headset</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adaes aminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat </p>
                    </div>
                  </div>
                </div>
                <div className="btn-area">
                  <a href="#" className="blue-btn">Learn more</a>
                  <a href="#" className="wt-btn">Sign up</a>
                </div>
              </div>
            </section>
            <section className="testimonials">
              <div className="container">
              <h2>Testimonials</h2>
                <div className="row">
                  <div className="col-md-4">
                    <div className="each-testimo">
                      <img src="../images/home-demo-photo-2c.png" className="img-fluid" />
                      <h3>John Doe</h3>
                      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut"</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="each-testimo">
                      <img src="../images/Profile-Interview-Photo---Fiona-Gray.png" className="img-fluid" />
                      <h3>Ms. Elna</h3>
                      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut"</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="each-testimo">
                      <img src="../images/testIMG1528182709.png" className="img-fluid" />
                      <h3>John Smith</h3>
                      <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut"</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="bottom-blue-banner">
              <div className="container">
                <div className="btn-area">
                  <a href="#" className="trns-btn">Learn more</a>
                  <a href="#" className="white-btn">Sign up</a>
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
                        <textarea type="text" className="form-control" placeholder="Message"></textarea>
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
                      <li><a href="#">Sign Up</a></li>
                      <li><a href="#">Sign In</a></li>
                    </ul>
                    
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
  return bindActionCreators({ }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Home);