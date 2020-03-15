import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactGA from 'react-ga';

import HomeHeader from '../Components/HomeHeader';
import {setActiveHeader} from '../../actions/setActiveHeader';
import {Notification} from '../../CommonPages/Components/Notification';

class Features extends Component{
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
      this.props.setActiveHeader("feature")
      window.scrollTo(0,0);
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
                console.log("err-----err-err--->",err.response)
                Notification("error","Sent failed","Something went wrong, request failed");
                this.setState({buttonloader:false})
            })

    }
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


            <section className="contact-us" id="contact_us">
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
                      <li><a href="#/features">Features</a></li>
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
  return bindActionCreators({ setActiveHeader:setActiveHeader }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Features);
