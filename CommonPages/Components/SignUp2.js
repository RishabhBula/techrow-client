import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {Steps} from 'antd';
import Stepper from 'react-stepper-horizontal';

const { Step } = Steps;

class SignUp2 extends Component{
	constructor(props){
		super(props);
    this.state = {
      firstname:"",
      lastname:"",
      email:"",
      phone:"",
      username:"",
      password:"",
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  next(){
    if(this.state.firstname=="" || this.state.lastname=="" || this.state.email=="" || this.state.phone=="" || this.state.username=="" || this.state.password==""){
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
           <div>
                <div>

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
                    defaultColor="white"
                    circleFontColor="black"
                    completeBarColor="#a9ff69"
                    lineMarginOffset={0} />

                </div>
                <span>Tell Us About Yourself</span>
                <div style={{backgroundColor: '#fff'}}>
                   <div>
                      <label>Firstname</label><br/>
                          <input id="firstname" type="firstname" className="" placeholder="Your firstname" value={this.state.firstname} onChange={(e) =>this.setState({firstname:e.target.value,error:false,errortext:""})}/><br/>
                      <label>Lastname</label><br/>
                          <input id="lastname" type="lastname" className="" placeholder="Your lastname" value={this.state.lastname} onChange={(e) =>this.setState({lastname:e.target.value,error:false,errortext:""})}/><br/>
                      <label>Email</label><br/>
                          <input id="email" type="email" className="" placeholder="Your email" value={this.state.email} onChange={(e) =>this.setState({email:e.target.value,error:false,errortext:""})}/><br/>
                      <label>Phone</label><br/>
                          <input id="phone" type="phone" className="" placeholder="Your phone" value={this.state.phone} onChange={(e) =>this.setState({phone:e.target.value,error:false,errortext:""})}/><br/>
                      <label>Username</label><br/>
                          <input id="username" type="username" className="" placeholder="Set username" value={this.state.username} onChange={(e) =>this.setState({username:e.target.value,error:false,errortext:""})}/><br/>
                      <label>password</label><br/>
                          <input id="password" type="password" className="" placeholder="Create a strong password" value={this.state.password} onChange={(e) =>this.setState({password:e.target.value,error:false,errortext:""})}/><br/>
                      {this.state.password!="" && (
                        <div className="row">
                          <div style={{backgroundColor: 'red',height: '10px',width: '20px'}}></div>
                          {this.state.password.length>=5 && (<div style={{backgroundColor: 'orange',height: '10px',width: '20px'}}></div>)}
                          {this.state.password.length>=10 && (<div style={{backgroundColor: 'green',height: '10px',width: '20px'}}></div>)}
                          {this.state.password.length<5 && (<div>Weak</div>)}
                          {this.state.password.length>=5 && this.state.password.length<10 && (<div>Medium</div>)}
                          {this.state.password.length>=10 && (<div>Strong</div>)}
                        </div>
                        )}
                   </div>
                   {this.state.error==true && (<div><span style={{color: 'red'}}>*{this.state.errortext}</span></div>)}
                   <span className="pointer" onClick={() =>{ this.next() }}>next</span>
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
  return bindActionCreators({ }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(SignUp2);