import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactGA from 'react-ga';

import HomeHeader from '../Components/HomeHeader';
import {setActiveHeader} from '../../actions/setActiveHeader';
import {Notification} from '../../CommonPages/Components/Notification';

class Home extends Component{
	constructor(props){
		super(props);
    this.state = {
      name:"",
      email:"",
      subject:"",
      message:"",
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
      this.props.setActiveHeader("home")
      window.scrollTo(0,0);
      // if(this.props.scrollHeader=="about"){
      //   var elmnt = document.getElementById("about");
      //       elmnt.scrollIntoView();
      // }
  }

  submit(){
    if( this.state.name=="" || this.state.email=="" || this.state.subject=="" || this.state.message==""){
        this.setState({error:true,errortext:"Please fill all the fields to continue"})
    }else{
        
        this.setState({buttonloader:true})
        let newsletter
        if(this.state.newsletter)
           newsletter='Yes'
        else
           newsletter='No'

        axios({
              method:"POST",
              url:'https://us-central1-techrow-platform.cloudfunctions.net/sendmail/contactus',
              data:{
                name:this.state.name,
                email:this.state.email,
                subject:this.state.subject,
                message:this.state.message,
                newsletter:newsletter,
              }
            }).then((response) =>{
                console.log("-----response from server--->",response)
                Notification("success","Sent successfully","Thanks for contacting us!");
                this.setState({buttonloader:false,name:"",email:"",subject:"",message:"",newsletter:false})
            }).catch((err) =>{
                console.log("err-----err-err--->",err)
                Notification("error","Sent failed","Something went wrong, request failed");
                this.setState({buttonloader:false})
            })

    }
  }

  render(){
      return(
        <div className="full-page animated fadeIn">
           <HomeHeader/>
            <section className="home-banner" id="banner">
              <div className="container">
                <h1>Unleashing the Immersive Learning Movement</h1>
              </div>
            </section>
            <section className="banner-bottom" id="about">
              <div className="container">
                <h2>We are a movement...</h2>
                <p>Virtual Reality transforms the learning experience by bringing anything you can imagine into the classroom. From exploring solar systems to standing in the middle of the Amazon Rainforest, students can now engage in learning like never before within minutes.</p>
              </div>
            </section>
            <section className="about-this">
              <div className="container cnt-area">
                <div className="row">
                  <div className="col-md-6 cnt-area-lft">
                    <h2><span>Unlock</span>the Power of Immersive Technology</h2>
                    <p>Our unique education solution enables teachers to empower the student with award winning immersive content coupled with the right tools to
drive focus and engagement in the classroom.</p>
                    <a href="#/features">View TECHROW Features →</a>
                    
                  </div>
                  <div className="col-md-6 about-cnt-rt">
                    <img src="./images/vr-girl.jpg" className="img-fluid" alt="vr"/>
                  </div>
                </div>
              </div>
            </section>
            <section className="techrow-platform">
              <div className="container">
                <h4>
                Renaissance Platform</h4>
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
                    <p>School subscribes to a world of immersive educational content and educator tools</p>
                  </div>
                  <div className="col-md-6">
                    <p>Educational content and tools are delivered on a high-powered virtual reality headset</p>
                  </div>
                </div>
                <h2>What You Get</h2>
                <div className="row">
                  <div className="col-md-4">
                    <div className="works-types">
                      <h3 style={{color:'#F58221'}}>Marketplace</h3>
                      <p>Teachers can explore an entire marketplace of immersive content right at their fingertips categorized by subject to complement curriculum</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="works-types">
                      <h3 style={{color:'#B0F542'}}>Experiences</h3>
                      <p>Students discover the world through immersive technology experiences improving the overall learning experience</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="works-types">
                      <h3 style={{color:'#FFF200'}}>Headset</h3>
                      <p>Cutting-edge, yet simple to use VR headset built for the needs of today’s classrooms and teachers.</p>
                    </div>
                  </div>
                </div>
                <div className="btn-area  d-none">
                  <a href="#" className="blue-btn">Learn more</a>
                  <a href="#/signup" className="wt-btn">Sign up</a>
                </div>
              </div>
            </section>
            <section className="testimonials d-none">
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
                  <a href="#/signup" className="white-btn">Sign up</a>
                </div>
              </div>
            </section>
            <section className="contact-us" id="contact">
              <div className="container">
                <div className="row">
                  <div className="col-md-7">
                    <h2>Have a question? Contact us!</h2>
                    <div className="form">
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={(e) =>{ this.setState({ name:e.target.value,error:false,errortext:"" }) }}/>
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={(e) =>{ this.setState({ email:e.target.value,error:false,errortext:"" }) }}/>
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Subject" value={this.state.subject} onChange={(e) =>{ this.setState({ subject:e.target.value,error:false,errortext:"" }) }}/>
                      </div>
                      <div className="form-group">
                        <textarea type="text" className="form-control" placeholder="Message...." value={this.state.message} onChange={(e) =>{ this.setState({ message:e.target.value,error:false,errortext:"" }) }}></textarea>
                      </div>
                      <div className="form-group checkbox">
                        <label><input type="checkbox" checked={this.state.newsletter} onChange={(e) =>{ this.setState({newsletter:e.target.checked}) }}/>Receive our TechRow newsletter</label>
                      </div>
                      {this.state.error==true && (<div><span style={{color: 'red'}}>{this.state.errortext}</span></div>)}
                      <div className="form-group">
                        {this.state.buttonloader==false &&(<button onClick={() =>{ this.submit() }}>Submit</button>)}
                        {this.state.buttonloader==true &&(<button>Sending</button>)}
                      </div>
                      
                    </div>
                  </div>
                  <div className="col-md-5">
                    <h3>Quick Links</h3>
                    <ul>
                      <li><a >Features</a></li>
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
                    <a href="https://www.linkedin.com/company/tech-row"  target="_blank"><img src="../images/linkedin-icon.png" className="img-fluid"/></a>
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
    scrollHeader:state.scrollHeader.scroll
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setActiveHeader:setActiveHeader }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Home);