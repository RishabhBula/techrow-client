import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

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
      
  }

  render(){
      return(
        <div>
           <div>
                <div className="form-wrap">
                    <span>Your Order has been Placed</span><br/>
                    <button className="pointer" onClick={() =>{ window.location.href="#/" }}>Go to Dashboard</button><br/>
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
export default connect(mapStateToProps, matchDispatchToProps)(OrderBundle4);