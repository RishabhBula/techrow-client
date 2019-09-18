import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import {setOrderDetails} from '../../actions/setOrderDetails';

class OrderBundle4 extends Component{
	constructor(props){
		super(props);
    this.state = {
      count:"",
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      console.log("order details",this.props.orderdetails)
  }

  render(){
      return(
        <div>
           <div className="confirm-order">
           <h4></h4>
             <div className="form-wrap signup-wrap order-bundle">
                    <img src="../images/green-tick.png" className="img-fluid tick"  />
                    <h5>Your Order has been Placed</h5>
                    <button className="green-btn" onClick={() =>{ window.location.href="#/" }}>Go to Dashboard</button><br/>
                </div>
            </div>
        </div>
      );
   }
}


function mapStateToProps(state){
  return{
      orderdetails:state.orderdetails,
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setOrderDetails:setOrderDetails }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(OrderBundle4);