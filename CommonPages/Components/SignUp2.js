import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {Steps, Input, Select} from 'antd';
import Stepper from 'react-stepper-horizontal';

import {setSignupDetails} from '../../actions/setSignupDetails';

const { Step } = Steps;
const InputGroup = Input.Group;
const Option = Select.Option;

class SignUp2 extends Component{
	constructor(props){
		super(props);
    this.state = {
      firstname:"",
      lastname:"",
      email:"",
      countrycode:"",
      phonenumber:"",
      username:"",
      password:"",
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  next(){
    if(this.state.firstname=="" || this.state.lastname=="" || this.state.email=="" || this.state.phonenumber=="" || this.state.password==""){
      this.setState({error:true,errortext:"please fill all fields to continue."})
    }else if(this.state.password.length<10){
      this.setState({error:true,errortext:"password strength not good."})
    }else{
      this.props.pageRender(3)
    }
  }

  render(){
      return(
        <div>
           <div className="signin-second signup-wrap animated fadeIn">
                <div className="step-iden">

                  {/*<Steps current={0}>
                    <Step style={{backgroundColor: 'red'}} status="wait"/>
                    <Step status="wait"/>
                    <Step status="wait"/>
                  </Steps>*/}

                  <Stepper 
                    steps={ [{}, {}, {}] } 
                    activeStep={ 0 }
                    activeColor="white"
                    completeColor="white"
                    className="step"
                    defaultColor="white"
                    circleFontColor="black"
                    completeBarColor="#a9ff69"
                    lineMarginOffset={0} />

                </div>
                <h4>Tell Us About Yourself</h4>
                <div className="form-wrap">
                    <div className="form">
                      <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                                <label>Firstname</label>
                                <input id="firstname" className="form-control" placeholder="Your firstname" value={this.state.firstname} onChange={(e) => {this.setState({firstname:e.target.value,error:false,errortext:""}); this.props.signupdetails.firstname=e.target.value }}/>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                                <label>Lastname</label>
                                <input id="lastname" className="form-control" placeholder="Your lastname" value={this.state.lastname} onChange={(e) => {this.setState({lastname:e.target.value,error:false,errortext:""}); this.props.signupdetails.lastname=e.target.value }}/>
                            </div>
                          </div>
                        </div>
                      <div className="form-group">
                          <label>Email</label>
                          <input id="email" className="form-control" placeholder="Your email" value={this.state.email} onChange={(e) => {this.setState({email:e.target.value,error:false,errortext:""}); this.props.signupdetails.email=e.target.value }}/>
                      </div>
                      <div className="form-group">
                          <label>Phone</label>
                          <InputGroup>
                             <Select
                                style={{ width:60 }}
                                value={this.state.countrycode}
                                onChange={(e) =>{this.setState({countrycode:e}); this.props.signupdetails.countrycode=e }}
                                >
                                  <Option value="+1">+1</Option>
                                  <Option value="+2">+2</Option>
                                  <Option value="+3">+3</Option>
                             </Select>
                             <input id="phonenumber" className="form-control" placeholder="Your phonenumber" value={this.state.phonenumber} onChange={(e) => {this.setState({phonenumber:e.target.value,error:false,errortext:""}); this.props.signupdetails.phonenumber=e.target.value }}/>
                          </InputGroup>
                      </div>
                      <div className="form-group">
                          <label>Username</label>
                          <input disabled id="username" className="form-control" placeholder="Set username" value={this.state.email} onChange={(e) => {this.setState({email:e.target.value,error:false,errortext:""}); this.props.signupdetails.email=e.target.value }}/>
                      </div>
                      <div className="form-group">
                          <label>password</label>
                          <input id="password" type="password" className="form-control" placeholder="Create a strong password" value={this.state.password} onChange={(e) => {this.setState({password:e.target.value,error:false,errortext:""}); this.props.signupdetails.password=e.target.value }}/>
                      </div>
                      {this.state.password!="" && (
                        <div className="pass-strength">
                          <div className="pass-strength-tile" style={{backgroundColor: 'red'}}></div>
                          {this.state.password.length>=5 && (<div  className="pass-strength-tile" style={{backgroundColor: 'orange'}}></div>)}
                          {this.state.password.length>=10 && (<div  className="pass-strength-tile" style={{backgroundColor: 'green'}}></div>)}
                          {this.state.password.length<5 && (<b>Weak</b>)}
                          {this.state.password.length>=5 && this.state.password.length<10 && (<b>Medium</b>)}
                          {this.state.password.length>=10 && (<b>Strong</b>)}
                          <br/><span className="about-password">At least 6 characters including uppercase, lowercase, number and symbol</span>
                        </div>
                        )}
                   </div>
                   {this.state.error==true && (<div><span style={{color: 'red'}}>*{this.state.errortext}</span></div>)}
                   <button className="pointer" onClick={() =>{ this.next() }}>Next<img src="./images/arrow-right.png" className="img-fluid"/></button>
                   <div className="clearfix"></div>
                </div>
            </div>
        </div>
      );
   }
}


function mapStateToProps(state){
  return{
    signupdetails:state.signupdetails
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setSignupDetails:setSignupDetails }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(SignUp2);