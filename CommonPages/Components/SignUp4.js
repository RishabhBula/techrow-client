import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {Steps} from 'antd';
import Stepper from 'react-stepper-horizontal';

import {setSignupDetails} from '../../actions/setSignupDetails';
import {getAuthentication} from '../../actions/authentication'

const { Step } = Steps;

class SignUp4 extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  
  componentDidMount(){
      
  }

  skip(){
      this.props.getAuthentication();
      window.location.href="#/";
  }

  orderbundle(){
      this.props.getAuthentication();
      window.location.href="#/orderbundle";
  }

  render(){
      return(
        <div>
           <div>
                <div>

                  {/*<Steps current={2}>
                    <Step status="wait"/>
                    <Step status="wait"/>
                    <Step status="wait"/>
                  </Steps>*/}

                  <Stepper 
                    steps={ [{}, {}, {}] } 
                    activeStep={ 2 }
                    activeColor="white"
                    completeColor="white"
                    defaultColor="white"
                    circleFontColor="black"
                    completeBarColor="#a9ff69"
                    lineMarginOffset={0} />

                </div>
                <h4>You're almost done</h4>
                <div className="form-wrap">
                   <div>
                     <span>Would you like to order a VR bundle?</span><br/>
                     <button className="pointer" onClick={() =>{ this.orderbundle() }}>Order Bundle</button><br/>
                     <a onClick={() =>{ this.skip() }}>skip for now</a><br/>
                   </div>
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
  return bindActionCreators({ setSignupDetails:setSignupDetails, getAuthentication:getAuthentication }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(SignUp4);