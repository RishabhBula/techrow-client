import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {notification} from 'antd';

import {Select,Steps} from 'antd';
// import ReCAPTCHA from "react-google-recaptcha";

import {setSignupDetails} from '../../actions/setSignupDetails';
import {Notification} from '../Components/Notification';

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
      schoolname:this.props.signupdetails.schoolname,
      address:this.props.signupdetails.address,
      city:this.props.signupdetails.city,
      state:this.props.signupdetails.state,
      zipcode:this.props.signupdetails.zipcode,
      grade:this.props.signupdetails.grade,
      schooldistrict:this.props.signupdetails.schooldistrict,
      po:this.props.signupdetails.po,
      taxexid:this.props.signupdetails.taxexid,
      error:false,
      errortext:"",
      buttonstate:false
    }
	}
  
  componentDidMount(){
      
  }

  next(){
    if(this.props.signupdetails.schoolname=="" || this.props.signupdetails.address=="" || this.props.signupdetails.city=="" || this.props.signupdetails.state=="" || this.props.signupdetails.zipcode==""){
      this.setState({error:true,errortext:"Please fill all fields to continue."})
    }else{
      this.setState({buttonstate:true})
      const db=firebase.firestore();
      let userObj={
            userType:this.props.signupdetails.type,
            firstName:this.props.signupdetails.firstname,
            lastName:this.props.signupdetails.lastname,
            email:this.props.signupdetails.email.trim().toLocaleLowerCase(),
            username:this.props.signupdetails.email.trim().toLocaleLowerCase(),
            phoneNumber:this.props.signupdetails.countrycode+" "+this.props.signupdetails.phonenumber,
            organization:{
              orgName:this.props.signupdetails.schoolname,
              orgAddress:this.props.signupdetails.address,
              orgCity:this.props.signupdetails.city,
              orgState:this.props.signupdetails.state,
              orgZipcode:this.props.signupdetails.zipcode,
              // grade:this.props.signupdetails.grade,
              orgDistrict:this.props.signupdetails.schooldistrict,
              orgPo:this.props.signupdetails.po,
              orgTaxexm:this.props.signupdetails.taxexid,

            },
            headJackCredentials:{
              authId:"",
              appId:""
            },
            contactContent:[],
            myOrders:[],
            myRecentViews:[],
            deafultShippingInformation:{},
            lastTransaction:{}
          }
      console.log("prooooopspspspsppspspsps======",this.props.signupdetails)
      firebase.auth().createUserWithEmailAndPassword(this.props.signupdetails.email.trim().toLocaleLowerCase(), this.props.signupdetails.password.trim())
      .then((res) =>{
            userObj.id=res.user.uid
            userObj.profileImage=""
            userObj.status=true
            userObj.emailVerified=true
            userObj.createdDate=firebase.firestore.FieldValue.serverTimestamp()
            userObj.updatedDate=firebase.firestore.FieldValue.serverTimestamp()
            userObj.searchquery=userObj.firstName.toLocaleLowerCase()

            db.collection("users").doc(res.user.uid).set(userObj)
            .then(() =>{
              let orgObj = {
                  name:this.props.signupdetails.schoolname,
                  address:this.props.signupdetails.address,
                  city:this.props.signupdetails.city,
                  state:this.props.signupdetails.state,
                  zipCode:this.props.signupdetails.zipcode,
                  // grade:this.props.signupdetails.grade,
                  schooldistrict:this.props.signupdetails.schooldistrict,
                  po:this.props.signupdetails.po,
                  taxexid:this.props.signupdetails.taxexid,
                }
                var org = db.collection("organisations").doc();
                    orgObj.id = org.id;
                    orgObj.searchquery = orgObj.name.toLocaleLowerCase();
                    org.set(orgObj);
                    let schoolObj={organization:{ id:org.id }}
                    db.collection("users").doc(res.user.uid).set(schoolObj, { merge: true })

            this.props.pageRender(4)
            this.clearsignupredux()
            this.setState({buttonstate:false})
            })
            .catch((error) =>{
              console.log("Error==>", error)
              this.setState({buttonstate:false})
            })
      })
      .catch((err) =>{
        // Handle Errors here.
        console.log("====error",err)
        var errorCode = err.code;
        var errorMessage = err.message;
        Notification("error",err.code.split("/")[1],err.message)
        this.setState({buttonstate:false})
        // ...
      })

    }
  }
  clearsignupredux(){
        this.props.signupdetails.type="";
        this.props.signupdetails.firstname="";
        this.props.signupdetails.lastname=""
        this.props.signupdetails.email="";
        this.props.signupdetails.password="";
        this.props.signupdetails.countrycode="";
        this.props.signupdetails.phonenumber="";
        this.props.signupdetails.schoolname="";
        this.props.signupdetails.address="";
        this.props.signupdetails.city="";
        this.props.signupdetails.state="";
        this.props.signupdetails.zipcode="";
        this.props.signupdetails.grade="";
        this.props.signupdetails.schooldistrict="";
        this.props.signupdetails.po="";
        this.props.signupdetails.taxexid="";
  }
  // onChange(value){
  //   console.log("captcha this.captchaRef",this.captchaRef)
  //   console.log("captcha value",value)
  //   axios({
  //         method:"POST",
  //         url:'http://localhost:4001/captchaverification',
  //         data:{
  //           captoken:value,
  //         }
  //       }).then((response) =>{
  //           console.log("-----response from server--->",response)
  //       }).catch((err) =>{
  //           console.log("err-----err-err--->",err.response)
  //       })
  // }

  render(){
      return(
        <div>
           <div className="signin-second signup-wrap">
                <div className="step-iden">

                    <ul className="step-view">
                      <li className="complete" onClick={() =>{ this.props.pageRender(2) }}><a>1</a></li>
                      <li className="active"><a>2</a></li>
                      <li className=""><a>3</a></li>
                    </ul>

                </div>
                <h4>Tell Us About Your Organization</h4>
                <div className="form-wrap animated fadeIn">
                    <div className="row">
                       <div className="form col">
                          <div className="form-group">
                              <label>Name</label>
                              <input id="schoolname" className="form-control" placeholder="(E.g. Saint Joseph Memorial School)" value={this.props.signupdetails.schoolname} onChange={(e) => {this.setState({schoolname:e.target.value,error:false,errortext:""}); this.props.signupdetails.schoolname=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>Address</label>
                              <input id="address" className="form-control" placeholder="your address" value={this.props.signupdetails.address} onChange={(e) => {this.setState({address:e.target.value,error:false,errortext:""}); this.props.signupdetails.address=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>City</label>
                              <input id="city" className="form-control" placeholder="your city" value={this.props.signupdetails.city} onChange={(e) => {this.setState({city:e.target.value,error:false,errortext:""}); this.props.signupdetails.city=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>State</label>
                              <input id="state" className="form-control" placeholder="your state" value={this.props.signupdetails.state} onChange={(e) => {this.setState({state:e.target.value,error:false,errortext:""}); this.props.signupdetails.state=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>Zip Code</label>
                              <input id="zipcode" className="form-control" placeholder="" value={this.props.signupdetails.zipcode} onChange={(e) => {this.setState({zipcode:e.target.value,error:false,errortext:""}); this.props.signupdetails.zipcode=e.target.value }}/>
                          </div>
                         {/* <div className="form-group">
                              <label>Grades</label>
                              <Select
                              showSearch
                              placeholder="Select Grade"
                              optionFilterProp="children"
                              value={this.state.grade}
                              onChange={(e) =>{this.setState({grade:e,error:false,errortext:""}); this.props.signupdetails.grade=e }}
                              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              >
                                <Option value="A+">A+</Option>
                                <Option value="B+">B+</Option>
                                <Option value="C+">C+</Option>
                              </Select>
                          </div>*/}
                       {this.state.error==true && (<div><span style={{color: 'red'}}>{this.state.errortext}</span></div>)}
                       </div>
                       <div className="form col">
                          <div className="form-group">
                              <label>School District (If any)</label>
                              <input id="schooldistrict" className="form-control" placeholder="" value={this.props.signupdetails.schooldistrict} onChange={(e) => {this.setState({schooldistrict:e.target.value,error:false,errortext:""}); this.props.signupdetails.schooldistrict=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>Purchase Order#</label>
                              <input id="po" className="form-control" placeholder="" value={this.props.signupdetails.po} onChange={(e) => {this.setState({po:e.target.value,error:false,errortext:""}); this.props.signupdetails.po=e.target.value }}/>
                          </div>
                          <div className="form-group">
                              <label>Tax ID</label>
                              <input id="taxexid" className="form-control" placeholder="" value={this.props.signupdetails.taxexid} onChange={(e) => {this.setState({taxexid:e.target.value,error:false,errortext:""}); this.props.signupdetails.taxexid=e.target.value }}/>
                          </div>
                         {/* <div className="form-group">
                            <ReCAPTCHA
                              ref={(e) => { this.captchaRef=e }}
                              sitekey="6LeWOLsUAAAAAPNpTNRoRsMGk6sWY3NcokH8QgA7"
                              onChange={(value) => this.onChange(value)}
                              onExpired={() => { console.log("expired"); this.captchaRef.reset() }}
                              onErrored={() => { }}
                              type="image"
                              size="normal"
                            />
                          </div>*/}
                        </div>
                      </div>
                  
                   {this.state.buttonstate==false && (<button className="pointer" onClick={() =>{ this.next() }}>Create Account<img src="./images/arrow-right.png" className="img-fluid"/></button>)}
                   {this.state.buttonstate==true && (<button disabled className="pointer">Creating Account<img src="./images/arrow-right.png" className="img-fluid"/></button>)}
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