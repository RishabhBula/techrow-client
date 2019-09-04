import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {Select,Steps} from 'antd';
import Stepper from 'react-stepper-horizontal';

import {setSignupDetails} from '../../actions/setSignupDetails';

const { Step } = Steps;
const Option = Select.Option;

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

class SignUp3 extends Component{
	constructor(props){
		super(props);
    this.state = {
      schoolname:"",
      address:"",
      city:"",
      state:"",
      zipcode:"",
      grade:"",
      schooldistrict:"",
      po:"",
      taxexid:"",
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  next(){
    if(this.state.schoolname=="" || this.state.address=="" || this.state.city=="" || this.state.state=="" || this.state.zipcode=="" || this.state.grade==""){
      this.setState({error:true,errortext:"please fill all fields to continue."})
    }else{
      const db=firebase.firestore();
      let userObj={
            userType:this.props.signupdetails.type,
            firstName:this.props.signupdetails.firstname,
            lastName:this.props.signupdetails.lastname,
            email:this.props.signupdetails.email,
            username:this.props.signupdetails.email,
            phoneNumber:this.props.signupdetails.countrycode+this.props.signupdetails.phonenumber,
            school:{
              name:this.props.signupdetails.schoolname,
              address:this.props.signupdetails.address,
              city:this.props.signupdetails.city,
              state:this.props.signupdetails.state,
              zipCode:this.props.signupdetails.zipcode,
              grade:this.props.signupdetails.grade,
              schooldistrict:this.props.signupdetails.schooldistrict,
              po:this.props.signupdetails.po,
              taxexid:this.props.signupdetails.taxexid,

            },
            headJackCredentials:{
              authId:"",
              appId:""
            },
            myOrders:[],
            myRecentViews:[]
          }
      console.log("prooooopspspspsppspspsps======",this.props.signupdetails)
      firebase.auth().createUserWithEmailAndPassword(this.props.signupdetails.email, this.props.signupdetails.password)
      .then((res) =>{
            userObj.id=res.user.uid
            userObj.status=true
            userObj.emailVerified=true
            userObj.createdDate=firebase.firestore.FieldValue.serverTimestamp()
            userObj.updatedDate=firebase.firestore.FieldValue.serverTimestamp()

            db.collection("users").doc(res.user.uid).set(userObj)
            this.props.pageRender(4)
      })
      .catch((error) =>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      })

    }
  }

  render(){
      return(
        <div>
           <div className="signin-second signup-wrap">>
                <div>

                  {/*<Steps current={1}>
                    <Step status="wait"/>
                    <Step status="wait"/>
                    <Step status="wait"/>
                  </Steps>*/}

                  <Stepper 
                    steps={ [{}, {}, {}] } 
                    activeStep={ 1 }
                    activeColor="white"
                    completeColor="white"
                    defaultColor="white"
                    circleFontColor="black"
                    completeBarColor="#a9ff69"
                    lineMarginOffset={0} />

                </div>
                <h4>Tell Us About Your School</h4>
                <div className="form-wrap">
                    <div className="row">
                       <div className="form col">
                          <div className="form-group">
                              <label>schoolName</label>
                              <input id="schoolname" className="form-control" placeholder="Your schoolname" value={this.state.schoolname} onChange={(e) => {this.setState({schoolname:e.target.value,error:false,errortext:""}); this.props.signupdetails.schoolname=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>Address</label>
                              <input id="address" className="form-control" placeholder="Your address" value={this.state.address} onChange={(e) => {this.setState({address:e.target.value,error:false,errortext:""}); this.props.signupdetails.address=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>City</label>
                              <input id="city" className="form-control" placeholder="Your city" value={this.state.city} onChange={(e) => {this.setState({city:e.target.value,error:false,errortext:""}); this.props.signupdetails.city=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>State</label>
                              <input id="state" className="form-control" placeholder="Your state" value={this.state.state} onChange={(e) => {this.setState({state:e.target.value,error:false,errortext:""}); this.props.signupdetails.state=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>Zip Code</label>
                              <input id="zipcode" className="form-control" placeholder="Set zipcode" value={this.state.zipcode} onChange={(e) => {this.setState({zipcode:e.target.value,error:false,errortext:""}); this.props.signupdetails.zipcode=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>Grades</label>
                              <Select
                              showSearch
                              placeholder="Select Grade"
                              optionFilterProp="children"
                              value={this.state.grade}
                              onChange={(e) =>{this.setState({grade:e}); this.props.signupdetails.grade=e }}
                              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              >
                                <Option value="A+">A+</Option>
                                <Option value="B+">B+</Option>
                                <Option value="C+">C+</Option>
                              </Select>
                          </div>
                       </div>
                       <div className="form col">
                          <div className="form-group">
                              <label>school District</label>
                              <input id="schooldistrict" className="form-control" placeholder="Your schooldistrict" value={this.state.schooldistrict} onChange={(e) => {this.setState({schooldistrict:e.target.value,error:false,errortext:""}); this.props.signupdetails.schooldistrict=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>PO#</label>
                              <input id="po" className="form-control" placeholder="Your po" value={this.state.po} onChange={(e) => {this.setState({po:e.target.value,error:false,errortext:""}); this.props.signupdetails.po=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>Tax Exemption ID</label>
                              <input id="taxexid" className="form-control" placeholder="Your taxexid" value={this.state.taxexid} onChange={(e) => {this.setState({taxexid:e.target.value,error:false,errortext:""}); this.props.signupdetails.taxexid=e.target.value }}/>
                          </div>
                        </div>
                      </div>
                   {this.state.error==true && (<div><span style={{color: 'red'}}>*{this.state.errortext}</span></div>)}
                  
                  <button className="pointer"onClick={() =>{ this.next() }}>Create Account<img src="./images/arrow-right.png" className="img-fluid"/></button>
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
export default connect(mapStateToProps, matchDispatchToProps)(SignUp3);