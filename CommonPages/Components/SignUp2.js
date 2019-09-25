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

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

class SignUp2 extends Component{
	constructor(props){
		super(props);
    this.state = {
      firstname:this.props.signupdetails.firstname,
      lastname:this.props.signupdetails.lastname,
      email:this.props.signupdetails.email,
      countrycode:this.props.signupdetails.countrycode,
      phonenumber:this.props.signupdetails.phonenumber,
      username:this.props.signupdetails.username,
      password:this.props.signupdetails.password,
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  next(){
    if(this.props.signupdetails.firstname=="" || this.props.signupdetails.lastname=="" || this.props.signupdetails.email=="" || this.props.signupdetails.phonenumber==""){
      this.setState({error:true,errortext:"please fill all fields to continue."})
    }else if(!strongRegex.test(this.props.signupdetails.password)){
      this.setState({error:true,errortext:"password strength not good."})
    }else{
      this.props.pageRender(3)
    }
  }

  render(){
      return(
        <div>
           <div className="signin-second signup-wrap">
                <div className="step-iden">

                    <ul className="step-view">
                      <li className="active"><a>1</a></li>
                      <li className="" onClick={() =>{ this.next() }}><a>2</a></li>
                      <li className=""><a>3</a></li>
                    </ul>

                </div>
                <h4>Tell Us About Yourself</h4>
                <div className="form-wrap animated fadeIn">
                    <div className="form">
                      <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                                <label>First Name</label>
                                <input id="firstname" className="form-control" placeholder="Your first name" value={this.props.signupdetails.firstname} onChange={(e) => {this.setState({firstname:e.target.value,error:false,errortext:""}); this.props.signupdetails.firstname=e.target.value }}/>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                                <label>Last Name</label>
                                <input id="lastname" className="form-control" placeholder="Your nick name" value={this.props.signupdetails.lastname} onChange={(e) => {this.setState({lastname:e.target.value,error:false,errortext:""}); this.props.signupdetails.lastname=e.target.value }}/>
                            </div>
                          </div>
                        </div>
                      <div className="form-group">
                          <label>Email</label>
                          <input id="email" className="form-control" placeholder="Your Email Address" value={this.props.signupdetails.email} onChange={(e) => {this.setState({email:e.target.value,error:false,errortext:""}); this.props.signupdetails.email=e.target.value }}/>
                      </div>
                      <div className="form-group">
                          <label>Phone</label>
                          <InputGroup>
                             <Select
                                style={{ width:60 }}
                                value={this.props.signupdetails.countrycode}
                                onChange={(e) =>{this.setState({countrycode:e}); this.props.signupdetails.countrycode=e }}
                                >
                                  <Option selected value="+1">+1</Option>
                                  <Option value="+2">+2</Option>
                                  <Option value="+3">+3</Option>
                             </Select>
                             <input id="phonenumber" className="form-control" placeholder="Your phone number" value={this.props.signupdetails.phonenumber} onChange={(e) => {this.setState({phonenumber:e.target.value,error:false,errortext:""}); this.props.signupdetails.phonenumber=e.target.value }}/>
                          </InputGroup>
                      </div>
                      <div className="form-group">
                          <label>Username</label>
                          <input disabled id="username" className="form-control" placeholder="Set username" value={this.props.signupdetails.email} onChange={(e) => {this.setState({email:e.target.value,error:false,errortext:""}); this.props.signupdetails.email=e.target.value }}/>
                      </div>
                      <div className="form-group">
                          <label>password</label>
                          <input id="password" type="password" className="form-control" placeholder="Create a strong password" value={this.props.signupdetails.password} onChange={(e) => {this.setState({password:e.target.value.trim(),error:false,errortext:""}); this.props.signupdetails.password=e.target.value.trim() }}/>
                      </div>
                      {this.props.signupdetails.password!="" && (
                        <div className="pass-strength">
                          <div className="pass-strength-tile" style={{backgroundColor: '#FF0400'}}></div>
                          {mediumRegex.test(this.props.signupdetails.password) && (<div  className="pass-strength-tile" style={{backgroundColor: '#E59C1D'}}></div>)}
                          {strongRegex.test(this.props.signupdetails.password) && (<div  className="pass-strength-tile" style={{backgroundColor: '#B1F543'}}></div>)}
                          {mediumRegex.test(this.props.signupdetails.password)==false && strongRegex.test(this.props.signupdetails.password)==false && (<b>Weak</b>)}
                          {mediumRegex.test(this.props.signupdetails.password)==true && strongRegex.test(this.props.signupdetails.password)==false && (<b>Medium</b>)}
                          {strongRegex.test(this.props.signupdetails.password) && (<b>Strong</b>)}
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