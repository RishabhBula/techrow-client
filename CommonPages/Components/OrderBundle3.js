import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import {setOrderDetails} from '../../actions/setOrderDetails';

class OrderBundle3 extends Component{
	constructor(props){
		super(props);
    this.state = {
      cardholdername:"",
      postalcode:"",
      cardnumber:"",
      expmonth:"",
      expyear:"",
      cvv:"",
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  next(){
    if(this.state.cardholdername=="" || this.state.postalcode=="" || this.state.cardnumber=="" || this.state.expmonth=="" || this.state.expyear=="" || this.state.cvv==""){
      this.setState({error:true,errortext:"please enter card details."})
    }else{
      this.props.pageRender(4)
    }
  }

  // paynow(){
  //   // https://us-central1-hk-project-0.cloudfunctions.net/httpReq
  //   axios({
  //         method:"POST",
  //         url:'https://us-central1-hk-project-0.cloudfunctions.net/httpReq',
  //         params:{
  //           email:"harikrishnan@hubspire.com",
  //           password:"1234567890Zx"
  //         }
  //       }).then((response) =>{
  //           console.log("-----response--->",response)
  //       }).catch((err) =>{
  //           console.log("err-----err-err--->",err.response)
  //       })
  // }

  render(){
      return(
        <div>
           <div className="signin-second signup-wrap billing-wrap animated fadeIn">
                <h4>Please enter Billing information:</h4>
                <div className="form-wrap">
                    <div className="form">
                      <div className="row">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6">
                          <div className="form-group">
                              <label>Name on Card</label>
                              <input id="cardholdername" className="form-control" placeholder="card holder name" value={this.state.cardholdername} onChange={(e) =>{ this.setState({cardholdername:e.target.value,error:false,errortext:""}); this.props.orderdetails.cardholdername=e.target.value; }}/>
                          </div>
                          <div className="form-group">
                              <label>Postal Code</label>
                              <input id="postalcode" className="form-control" placeholder="postalcode" value={this.state.postalcode} onChange={(e) =>{ this.setState({postalcode:e.target.value,error:false,errortext:""}); this.props.orderdetails.postalcode=e.target.value; }}/>
                          </div>
                          <div className="form-group">
                              <label>Card Number(no spaces or dashes)</label>
                              <input id="cardnumber" className="form-control" placeholder="cardnumber" value={this.state.cardnumber} onChange={(e) =>{ this.setState({cardnumber:e.target.value,error:false,errortext:""}); this.props.orderdetails.cardnumber=e.target.value; }}/>
                          </div>
                          <div className="form-group">
                              <label>Expiration</label>
                              <input className="form-control" placeholder="MM" value={this.state.expmonth} onChange={(e) =>{ this.setState({expmonth:e.target.value,error:false,errortext:""}); this.props.orderdetails.expmonth=e.target.value; }}/>
                              <input className="form-control" placeholder="YY" value={this.state.expyear} onChange={(e) =>{ this.setState({expyear:e.target.value,error:false,errortext:""}); this.props.orderdetails.expyear=e.target.value; }}/>
                          </div>
                          <div className="form-group">
                              <label>CVV</label>
                              <input id="cvv" className="form-control" placeholder="cvv" value={this.state.cvv} onChange={(e) =>{ this.setState({cvv:e.target.value,error:false,errortext:""}); this.props.orderdetails.cvv=e.target.value; }}/>
                          </div>
                        </div>
                      </div>
                    </div>
                   {this.state.error==true && (<div><span style={{color: 'red'}}>*{this.state.errortext}</span></div>)}
                   <button className="pointer"  onClick={() =>{ this.next() }}>Next<img src="./images/arrow-right.png" className="img-fluid"/></button>
                  {/* <button className="pointer"  onClick={() =>{ this.paynow() }}>paynow<img src="./images/arrow-right.png" className="img-fluid"/></button>*/}
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
export default connect(mapStateToProps, matchDispatchToProps)(OrderBundle3);