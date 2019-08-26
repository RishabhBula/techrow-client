import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import {setOrderDetails} from '../../actions/setOrderDetails';

class OrderBundle1 extends Component{
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

  next(){
    if(this.state.count==""){
        this.setState({error:true,errortext:"please enter how many headset you need"})
    }else{
        this.props.pageRender(2)
    }
  }

  render(){
      return(
        <div>
          <div className="">
          <h4>Order Bundles</h4>
             <div className="form-wrap signup-wrap order-bundle">
                <div style={{backgroundColor: '#fff'}}>
                   <div className="form">
                   <h2>Please tell us how many headsets you need:</h2>
                    <div className="form-group">
                      <input id="count" className="form-control order-num" placeholder="000" value={this.state.count} onChange={(e) =>{ this.setState({count:e.target.value,error:false,errortext:""}); this.props.orderdetails.ordercount=e.target.value; }}/>
                    </div>
                   </div>
                   
                   {this.state.error==true && (<div><span style={{color: 'red'}}>*{this.state.errortext}</span></div>)}
                  
                   <button className="pointer"  onClick={() =>{ this.next() }}>Next<img src="./images/arrow-right.png" className="img-fluid"/></button>
                  <div className="clearfix"></div>
                </div>
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
export default connect(mapStateToProps, matchDispatchToProps)(OrderBundle1);