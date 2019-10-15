import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {Steps} from 'antd';

import {setSignupDetails} from '../../actions/setSignupDetails';
import {setOrderDetails} from '../../actions/setOrderDetails';
import {getAuthentication} from '../../actions/authentication'

const { Step } = Steps;

class SignUp4 extends Component{
  constructor(props){
    super(props);
    this.state = {
        count:"",
        error:false,
        errortext:""
    }
  }
  
  componentDidMount(){
      
  }

  skip(){
      this.props.getAuthentication();
      window.location.href="#/";
      localStorage.removeItem("extraCount");
  }

  orderbundle(){
      this.props.getAuthentication();
      window.location.href="#/orderbundle";
  }

  calculateprice(){
      let headSetBundleCount=1;
      let headSetBundlePrice=850;
      let totalBundleCost=headSetBundleCount*headSetBundlePrice;
      let additionalHeadSetCount=Number(this.props.orderdetails.ordercount);
      let additionalHeadSetPrice=150;
      let totalAdditionalHeadSetCost=additionalHeadSetCount*additionalHeadSetPrice;
      let orderTotalAmount=totalBundleCost+totalAdditionalHeadSetCost;
      return orderTotalAmount;
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
                     <h5>Each Bundle includes 10 VR Headsets, if you need additional please enter additional amount in the field below:</h5>
                     <h6>Additional Headsets (Optional) <br/>Each Additional Headset costs $150</h6>
                     <div className="form-group">
                       <input id="count" className="form-control order-num" style={{width: '50%',display: 'unset', textAlign:'center'}} placeholder="000" value={this.state.count} onChange={(e) =>{ this.setState({count:e.target.value,error:false,errortext:""}); this.props.orderdetails.ordercount=e.target.value; localStorage.extraCount=e.target.value }} />
                     </div>
                     <button className="green-btn" onClick={() =>{ this.orderbundle() }}>Order Bundle @ ${this.calculateprice()}</button><br/>
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
      signupdetails:state.signupdetails,
      orderdetails:state.orderdetails,
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setSignupDetails:setSignupDetails, getAuthentication:getAuthentication, setOrderDetails:setOrderDetails }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(SignUp4);