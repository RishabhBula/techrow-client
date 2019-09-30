import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {Checkbox} from 'antd';

import {setOrderDetails} from '../../actions/setOrderDetails';

class OrderBundle2 extends Component{
	constructor(props){
		super(props);
    this.state = {
      sname:"",
      saddress:"",
      scity:"",
      sstate:"",
      szipcode:"",
      bname:"",
      baddress:"",
      bcity:"",
      bstate:"",
      bzipcode:"",
      billingcheck:false,
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  paynow(){
    if(this.state.sname=="" || this.state.saddress=="" || this.state.scity=="" || this.state.sstate=="" || this.state.szipcode=="" ){
      this.setState({error:true,errortext:"please fill all fields to continue."})
    }else{
      this.props.pageRender(3)
    }
    console.log("=======",this.props.orderdetails)
  }

  paylater(){
    if(this.state.sname=="" || this.state.saddress=="" || this.state.scity=="" || this.state.sstate=="" || this.state.szipcode=="" ){
      this.setState({error:true,errortext:"please fill all fields to continue."})
    }else{
      this.props.pageRender(5)
    }
    console.log("=======",this.props.orderdetails)
  }

  billingcheck(e){
    this.setState({billingcheck:e.target.checked})
    this.setState({
        bname:this.state.sname,
        baddress:this.state.saddress,
        bcity:this.state.scity,
        bstate:this.state.sstate,
        bzipcode:this.state.szipcode,
    })
    this.props.orderdetails.bname=this.state.sname;
    this.props.orderdetails.baddress=this.state.saddress;
    this.props.orderdetails.bcity=this.state.scity;
    this.props.orderdetails.bstate=this.state.sstate;
    this.props.orderdetails.bzipcode=this.state.szipcode;
  }

  render(){
      return(
        <div>
           <div className="signin-second signup-wrap animated fadeIn">
                <h4>Please enter shipping information:</h4>
                <div className="form-wrap">
                    <div className="row">
                       <div className="form col">
                          <div className="row">
                            <label className="col">Shipping Address</label>
                            <Checkbox className="col" checked={this.state.billingcheck} onChange={(e) =>{ this.billingcheck(e) }}>Billing same as Shipping</Checkbox>
                          </div>
                          <div className="form-group">
                              <label>Name</label>
                              <input id="sname" className="form-control" placeholder="Your name" value={this.state.sname} onChange={(e) =>{ if(this.state.billingcheck) { this.setState({sname:e.target.value,bname:e.target.value,error:false,errortext:""}); this.props.orderdetails.sname=e.target.value; this.props.orderdetails.bname=e.target.value; }else{ this.setState({sname:e.target.value,error:false,errortext:""}); this.props.orderdetails.sname=e.target.value; }  }}/>
                          </div>
                          <div className="form-group">
                              <label>Address</label>
                              <input id="saddress" className="form-control" placeholder="Your address" value={this.state.saddress} onChange={(e) =>{ if(this.state.billingcheck) { this.setState({saddress:e.target.value,baddress:e.target.value,error:false,errortext:""}); this.props.orderdetails.saddress=e.target.value; this.props.orderdetails.baddress=e.target.value; } else { this.setState({saddress:e.target.value,error:false,errortext:""}); this.props.orderdetails.saddress=e.target.value; } }}/>
                          </div>
                          <div className="form-group">
                              <label>City</label>
                              <input id="scity" className="form-control" placeholder="Your city" value={this.state.scity} onChange={(e) =>{ if(this.state.billingcheck) { this.setState({scity:e.target.value,bcity:e.target.value,error:false,errortext:""}); this.props.orderdetails.scity=e.target.value; this.props.orderdetails.bcity=e.target.value; } else { this.setState({scity:e.target.value,error:false,errortext:""}); this.props.orderdetails.scity=e.target.value; } }}/>
                          </div>
                          <div className="form-group">
                              <label>State</label>
                              <input id="sstate" className="form-control" placeholder="Your state" value={this.state.sstate} onChange={(e) =>{ if(this.state.billingcheck) { this.setState({sstate:e.target.value,bstate:e.target.value,error:false,errortext:""}); this.props.orderdetails.sstate=e.target.value; this.props.orderdetails.bstate=e.target.value; } else { this.setState({sstate:e.target.value,error:false,errortext:""}); this.props.orderdetails.sstate=e.target.value; } }}/>
                          </div>
                          <div className="form-group">
                              <label>Zip Code</label>
                              <input id="szipcode" className="form-control" placeholder="Set zipcode" value={this.state.szipcode} onChange={(e) =>{ if(this.state.billingcheck) { this.setState({szipcode:e.target.value,bzipcode:e.target.value,error:false,errortext:""}); this.props.orderdetails.szipcode=e.target.value; this.props.orderdetails.bzipcode=e.target.value; } else { this.setState({szipcode:e.target.value,error:false,errortext:""}); this.props.orderdetails.szipcode=e.target.value; } }}/>
                          </div>
                       </div>
                       <div className="form col">
                          <div className="row">
                            <label className="col">Billing Address</label>
                          </div>
                          <div className="form-group">
                              <label>Name</label>
                              <input disabled={this.state.billingcheck} id="bname" className="form-control" placeholder="Your name" value={this.state.bname} onChange={(e) =>{ this.setState({bname:e.target.value,error:false,errortext:""}); this.props.orderdetails.bname=e.target.value; }}/>
                          </div>
                          <div className="form-group">
                              <label>Address</label>
                              <input disabled={this.state.billingcheck} id="baddress" className="form-control" placeholder="Your address" value={this.state.baddress} onChange={(e) =>{ this.setState({baddress:e.target.value,error:false,errortext:""}); this.props.orderdetails.baddress=e.target.value; }}/>
                          </div>
                          <div className="form-group">
                              <label>City</label>
                              <input disabled={this.state.billingcheck} id="bcity" className="form-control" placeholder="Your city" value={this.state.bcity} onChange={(e) =>{ this.setState({bcity:e.target.value,error:false,errortext:""}); this.props.orderdetails.bcity=e.target.value; }}/>
                          </div>
                          <div className="form-group">
                              <label>State</label>
                              <input disabled={this.state.billingcheck} id="bstate" className="form-control" placeholder="Your state" value={this.state.bstate} onChange={(e) =>{ this.setState({bstate:e.target.value,error:false,errortext:""}); this.props.orderdetails.bstate=e.target.value; }}/>
                          </div>
                          <div className="form-group">
                              <label>Zip Code</label>
                              <input disabled={this.state.billingcheck} id="bzipcode" className="form-control" placeholder="Set zipcode" value={this.state.bzipcode} onChange={(e) =>{ this.setState({bzipcode:e.target.value,error:false,errortext:""}); this.props.orderdetails.bzipcode=e.target.value; }}/>
                          </div>
                       </div>
                    </div>
                   {this.state.error==true && (<div><span style={{color: 'red'}}>{this.state.errortext}</span></div>)}
                   <button className="pointer" onClick={() =>{ this.paynow() }}>Pay Now using Credit Card<img src="./images/arrow-right.png" className="img-fluid"/></button>
                   <button className="pointer" onClick={() =>{ this.paylater() }}>Pay later - Send me an Invoice<img src="./images/arrow-right.png" className="img-fluid"/></button>
                   <div className="clearfix"></div>
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
export default connect(mapStateToProps, matchDispatchToProps)(OrderBundle2);