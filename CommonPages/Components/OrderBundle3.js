import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

class OrderBundle3 extends Component{
	constructor(props){
		super(props);
    this.state = {
      name:"",
      postalcode:"",
      cardnumber:"",
      startdate:"",
      enddate:"",
      cvv:"",
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  next(){
    if(this.state.name=="" || this.state.postalcode=="" || this.state.cardnumber=="" || this.state.startdate=="" || this.state.enddate=="" || this.state.cvv==""){
      this.setState({error:true,errortext:"please enter card details."})
    }else{
      this.props.pageRender(4)
    }
  }

  render(){
      return(
        <div>
           <div>
                <span>Please enter shipping information:</span>
                <div style={{backgroundColor: '#fff'}}>
                   <div>
                      <label>Name on Card</label><br/>
                          <input id="name" type="name" className="" placeholder="card holder name" value={this.state.name} onChange={(e) =>this.setState({name:e.target.value,error:false,errortext:""})}/><br/>
                      <label>Postal Code</label><br/>
                          <input id="postalcode" type="postalcode" className="" placeholder="postalcode" value={this.state.postalcode} onChange={(e) =>this.setState({postalcode:e.target.value,error:false,errortext:""})}/><br/>
                      <label>Card Number(no spaces or dashes)</label><br/>
                          <input id="cardnumber" type="cardnumber" className="" placeholder="cardnumber" value={this.state.cardnumber} onChange={(e) =>this.setState({cardnumber:e.target.value,error:false,errortext:""})}/><br/>
                      <label>Expiration</label><br/>
                          <input id="startdate" type="startdate" className="" placeholder="startdate" value={this.state.startdate} onChange={(e) =>this.setState({startdate:e.target.value,error:false,errortext:""})}/>
                          <input id="enddate" type="enddate" className="" placeholder="enddate" value={this.state.enddate} onChange={(e) =>this.setState({enddate:e.target.value,error:false,errortext:""})}/><br/>
                      <label>CVV</label><br/>
                          <input id="cvv" type="cvv" className="" placeholder="cvv" value={this.state.cvv} onChange={(e) =>this.setState({cvv:e.target.value,error:false,errortext:""})}/><br/>
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
export default connect(mapStateToProps, matchDispatchToProps)(OrderBundle3);