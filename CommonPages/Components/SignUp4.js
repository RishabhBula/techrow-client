import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {Steps} from 'antd';
import Stepper from 'react-stepper-horizontal';

const { Step } = Steps;

class SignUp4 extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  
  componentDidMount(){
      
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
                <span>You're almost done</span>
                <div style={{backgroundColor: '#fff'}}>
                   <div>
                   <span>Would you like to order a VR bundle?</span><br/>
                   <button className="pointer" onClick={() =>{ window.location.href="#/orderbundle" }}>Order Bundle</button><br/>
                   <a href="#/">skip for now</a><br/>
                   </div>
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
export default connect(mapStateToProps, matchDispatchToProps)(SignUp4);