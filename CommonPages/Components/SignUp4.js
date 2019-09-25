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
           <div className="confirm-order">
                <div className="step-iden">

                    <ul className="step-view">
                      <li className="complete"><a>1</a></li>
                      <li className="complete"><a>2</a></li>
                      <li className="active"><a>3</a></li>
                    </ul>

                </div>
                <h4>You're almost done</h4>
                <div className="form-wrap animated fadeIn">
                   <div>
                     <h5>Would you like to order a VR bundle?</h5>
                     <button disabled className="green-btn" onClick={() =>{ this.orderbundle() }}>Order Bundle</button><br/>
                     <a  onClick={() =>{ this.skip() }}><u>skip for now</u></a><br/>
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