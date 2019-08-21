import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

class OrderBundle2 extends Component{
	constructor(props){
		super(props);
    this.state = {
      name:"",
      address:"",
      city:"",
      state:"",
      zipcode:"",
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  next(){
    if(this.state.name=="" || this.state.address=="" || this.state.city=="" || this.state.state=="" || this.state.zipcode=="" || this.state.grade==""){
      this.setState({error:true,errortext:"please fill all fields to continue."})
    }else{
      this.props.pageRender(3)
    }
  }

  render(){
      return(
        <div>
           <div>
                <h4>Please enter shipping information:</h4>
                <div className="form-wrap">
                   <div className="form">
                      <div className="form-group">
                          <label>Name</label>
                          <input id="name" type="name" className="form-control" placeholder="Your name" value={this.state.name} onChange={(e) =>this.setState({name:e.target.value,error:false,errortext:""})}/>
                      </div>
                      <div className="form-group">
                          <label>Address</label>
                          <input id="address" type="address" className="form-control" placeholder="Your address" value={this.state.address} onChange={(e) =>this.setState({address:e.target.value,error:false,errortext:""})}/>
                      </div>
                      <div className="form-group">
                          <label>City</label>
                          <input id="city" type="city" className="form-control" placeholder="Your city" value={this.state.city} onChange={(e) =>this.setState({city:e.target.value,error:false,errortext:""})}/>
                      </div>
                      <div className="form-group">
                          <label>State</label>
                          <input id="state" type="state" className="form-control" placeholder="Your state" value={this.state.state} onChange={(e) =>this.setState({state:e.target.value,error:false,errortext:""})}/>
                      </div>
                      <div className="form-group">
                          <label>Zip Code</label>
                          <input id="zipcode" type="zipcode" className="form-control" placeholder="Set zipcode" value={this.state.zipcode} onChange={(e) =>this.setState({zipcode:e.target.value,error:false,errortext:""})}/>
                      </div>
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
export default connect(mapStateToProps, matchDispatchToProps)(OrderBundle2);