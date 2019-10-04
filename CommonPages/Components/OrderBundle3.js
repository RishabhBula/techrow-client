import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {notification} from 'antd';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

import {setOrderDetails} from '../../actions/setOrderDetails';
import {Notification} from '../Components/Notification';

class _SplitFieldsForm extends Component{
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

  paynow(){
    // https://us-central1-techrow-platform.cloudfunctions.net/paynow/charge
    if(this.props.stripe){
        this.props.stripe.createToken()
                         .then((response) =>{
                                console.log("stripe======response",response)
                                if(response.token!=undefined)
                                Notification("success","cardToken generated",response.token.id)
                                if(response.error!=undefined)
                                Notification("error",response.error.code,response.error.message)
                                // axios({
                                //   method:"POST",
                                //   url:'https://us-central1-techrow-platform.cloudfunctions.net/paynow/charge',
                                //   data:{
                                //     cardToken:response.token.id,
                                //     additional:"2"
                                //   }
                                // }).then((response) =>{
                                //     console.log("-----response from server--->",response.data)
                                // }).catch((err) =>{
                                //     console.log("err-----err-err--->",err.response)
                                // })
                         })
                         .catch((error) =>{
                                console.log("stripe======error",error)
                         })
    }else{

    }
  }

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
                              {/*<input id="cardnumber" className="form-control" placeholder="cardnumber" value={this.state.cardnumber} onChange={(e) =>{ this.setState({cardnumber:e.target.value,error:false,errortext:""}); this.props.orderdetails.cardnumber=e.target.value; }}/>*/}
                              <CardNumberElement className="form-control"/>
                          </div>
                          <div className="form-group">
                              <label>Expiration</label>
                              {/*<input className="form-control" placeholder="MM" value={this.state.expmonth} onChange={(e) =>{ this.setState({expmonth:e.target.value,error:false,errortext:""}); this.props.orderdetails.expmonth=e.target.value; }}/>
                              <input className="form-control" placeholder="YY" value={this.state.expyear} onChange={(e) =>{ this.setState({expyear:e.target.value,error:false,errortext:""}); this.props.orderdetails.expyear=e.target.value; }}/>*/}
                              <CardExpiryElement className="form-control"/>
                          </div>
                          <div className="form-group">
                              <label>CVV</label>
                              {/*<input id="cvv" className="form-control" placeholder="cvv" value={this.state.cvv} onChange={(e) =>{ this.setState({cvv:e.target.value,error:false,errortext:""}); this.props.orderdetails.cvv=e.target.value; }}/>*/}
                              <CardCVCElement className="form-control"/>
                          </div>
                          <div className="form-group">
                              <button className="form-control img-fluid" onClick={() =>{ this.paynow() }}>Pay Now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                   {this.state.error==true && (<div><span style={{color: 'red'}}>{this.state.errortext}</span></div>)}
                   {/*<button className="pointer"  onClick={() =>{ this.next() }}>Next<img src="./images/arrow-right.png" className="img-fluid"/></button>*/}
                  {/* <button className="pointer"  onClick={() =>{ this.paynow() }}>paynow<img src="./images/arrow-right.png" className="img-fluid"/></button>*/}
                   <div className="clearfix"></div>
                </div>
            </div>
        </div>
      );
   }
}

const SplitFieldsForm = injectStripe(_SplitFieldsForm);

class OrderBundle3 extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_3cm5TpbHpNtHkYSLTxwwrZiN00z0pDqLFP">
        <Elements>
          <SplitFieldsForm/>
        </Elements>
      </StripeProvider>
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