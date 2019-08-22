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
           <div className="form-wrap">
                <h4>Order Bundles</h4>
                <div style={{backgroundColor: '#fff'}}>
                   <label>Please tell us how many headsets you need:</label><br/>
                   <input id="count" type="count" className="" placeholder="000" value={this.state.count} onChange={(e) =>{ this.setState({count:e.target.value,error:false,errortext:""}); this.props.orderdetails.ordercount=e.target.value; }}/><br/>
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
      orderdetails:state.orderdetails,
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setOrderDetails:setOrderDetails }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(OrderBundle1);