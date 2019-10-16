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

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

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
      errortext:"",
      buttonstate:false
    }
	}
  
  componentDidMount(){
      
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

  paynow(){
    // https://us-central1-techrow-platform.cloudfunctions.net/paynow/charge
    if(this.props.stripe){
        this.props.stripe.createToken()
                         .then(async (response) =>{
                                console.log("stripe======response",response,this.props)
                                if(response.token!=undefined){
                                    this.setState({buttonstate:true})

                                    // axios({
                                    //   method:"POST",
                                    //   url:'http://localhost:4001/charge',
                                    //   data:{
                                    //     cardToken:response.token.id,
                                    //     email:this.props.userData.email,
                                    //     additional:Number(this.props.orderdetails.ordercount)
                                    //   }
                                    // }).then(async (res) =>{
                                    //     console.log("-----response from server--->",res.data)
                                          try{
                                                let headSetBundleCount=1;
                                                let headSetBundlePrice=850;
                                                let totalBundleCost=headSetBundleCount*headSetBundlePrice;
                                                let additionalHeadSetCount=Number(this.props.orderdetails.ordercount);
                                                let additionalHeadSetPrice=150;
                                                let totalAdditionalHeadSetCost=additionalHeadSetCount*additionalHeadSetPrice;
                                                let orderTotalAmount=totalBundleCost+totalAdditionalHeadSetCost;

                                                const db=firebase.firestore();
                                                let orderObj = {
                                                    headSetBundleCount:headSetBundleCount,
                                                    headSetBundlePrice:headSetBundlePrice,
                                                    totalBundleCost:totalBundleCost,
                                                    additionalHeadSetCount:additionalHeadSetCount,
                                                    additionalHeadSetPrice:additionalHeadSetPrice,
                                                    totalAdditionalHeadSetCost:totalAdditionalHeadSetCost,
                                                    orderTotalAmount:orderTotalAmount,
                                                    orderAmountPaid:0,
                                                    paymentSuccessfull:false,
                                                    orderConfirmed:false,
                                                    updatedDate:firebase.firestore.FieldValue.serverTimestamp(),
                                                    createdDate:firebase.firestore.FieldValue.serverTimestamp(),
                                                    BillingAddressSameAsshippingAddress:this.props.orderdetails.billingcheck,
                                                    teacherInformation:{
                                                                          id:this.props.userData.id,
                                                                          firstName:this.props.userData.firstName,
                                                                          lastName:this.props.userData.lastName,
                                                                          email:this.props.userData.email,
                                                                          username:this.props.userData.username,
                                                                          phoneNumber:this.props.userData.phoneNumber,
                                                                          organization:this.props.userData.organization
                                                                       },
                                                    billingInformation:{
                                                                          name:this.props.orderdetails.bname,
                                                                          address:this.props.orderdetails.baddress,
                                                                          city:this.props.orderdetails.bcity,
                                                                          state:this.props.orderdetails.bstate,
                                                                          zipCode:this.props.orderdetails.bzipcode
                                                                       },
                                                    shippingInformation:{
                                                                          name:this.props.orderdetails.sname,
                                                                          address:this.props.orderdetails.saddress,
                                                                          city:this.props.orderdetails.scity,
                                                                          state:this.props.orderdetails.sstate,
                                                                          zipCode:this.props.orderdetails.szipcode
                                                                       },
                                                    stripePaymentInfo:{
                                                                        cardToken:response.token.id,
                                                                        // successDetails:res.data
                                                                      }
                                                }

                                                let userId = this.props.userData.id
                                                var order = db.collection("orders").doc();
                                                orderObj.id = order.id;
                                                orderObj.orderNumber = order.id;
                                                await order.set(orderObj)
                                                let orderArray=[]
                                                orderArray=this.props.userData.myOrders;
                                                orderArray.push(order.id);
                                                let update={myOrders:orderArray,deafultShippingInformation:orderObj.shippingInformation}
                                                await db.collection("users").doc(userId).set(update, { merge: true })

                                                Notification("success","cardToken generated",response.token.id)
                                                this.props.pageRender(4)
                                                this.setState({buttonstate:false})
                                             }
                                             catch (err){
                                                console.log("Error==>", err)
                                                this.setState({buttonstate:false})
                                             }

                                    // }).catch((err) =>{
                                    //     console.log("err-----err-err--->",err)
                                    //     this.setState({buttonstate:false})
                                    // })

                                }
                                if(response.error!=undefined){
                                  Notification("error",response.error.code,response.error.message)
                                }
                                
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
           <div className="signin-second signup-wrap billing-wrap animated fadeIn orderbundle">
                <h4>Please Enter Credit Card information:</h4>
                <div className="form-wrap">
                    <div className="form">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="card">
                          <div className="row ">
                            <div className="col-sm-12">
                              <img src="./images/headset.png"/>
                            </div>
                            <div className="col-sm-12" style={{paddingTop: '20px', paddingBottom: '20px' }}>
                              <span>{this.props.orderdetails.ordercount} X <span>Headsets</span> </span>
                            </div>
                          </div>
                          </div>
                          <div className="row card-types" style={{paddingTop: '50px'}}>
                           <div  className="col-sm-3">
                             <img src="./images/visa.png"/>
                           </div>
                           <div  className="col-sm-3">
                             <img src="./images/master.png"/>
                           </div>
                           <div  className="col-sm-3">
                             <img src="./images/amex.png"/>
                           </div>
                           <div  className="col-sm-3">
                             <img src="./images/discover.png"/>
                           </div>
                          </div>
                        </div>
                        <div className="col-sm-6 card-details-form">
                        <div className="row ">
                          <div  className="col-sm-7">
                            <div className="form-group">
                                <label>Name on Card</label>
                                <input id="cardholdername" className="form-control" placeholder="Ex. john Doe" value={this.state.cardholdername} onChange={(e) =>{ this.setState({cardholdername:e.target.value,error:false,errortext:""}); this.props.orderdetails.cardholdername=e.target.value; }}/>
                            </div>
                          </div>
                          <div  className="col-sm-5">
                            <div className="form-group">
                                <label>Postal Code</label>
                                <input id="postalcode" className="form-control" placeholder="12345" value={this.state.postalcode} onChange={(e) =>{ this.setState({postalcode:e.target.value,error:false,errortext:""}); this.props.orderdetails.postalcode=e.target.value; }}/>
                            </div>
                          </div>
                        </div>
                          <div className="form-group">
                              <label>Card Number(no spaces or dashes)</label>
                              {/*<input id="cardnumber" className="form-control" placeholder="cardnumber" value={this.state.cardnumber} onChange={(e) =>{ this.setState({cardnumber:e.target.value,error:false,errortext:""}); this.props.orderdetails.cardnumber=e.target.value; }}/>*/}
                              <CardNumberElement className="form-control"/>
                          </div>
                          <div className="row">
                          <div  className="col-sm-7">
                          <div className="form-group">
                              <label>Expiration</label>
                              {/*<input className="form-control" placeholder="MM" value={this.state.expmonth} onChange={(e) =>{ this.setState({expmonth:e.target.value,error:false,errortext:""}); this.props.orderdetails.expmonth=e.target.value; }}/>
                              <input className="form-control" placeholder="YY" value={this.state.expyear} onChange={(e) =>{ this.setState({expyear:e.target.value,error:false,errortext:""}); this.props.orderdetails.expyear=e.target.value; }}/>*/}
                              <CardExpiryElement className="form-control"/>
                          </div>
                          </div>
                          <div  className="col-sm-5">
                          <div className="form-group">
                              <label>CVV</label>
                              {/*<input id="cvv" className="form-control" placeholder="cvv" value={this.state.cvv} onChange={(e) =>{ this.setState({cvv:e.target.value,error:false,errortext:""}); this.props.orderdetails.cvv=e.target.value; }}/>*/}
                              <CardCVCElement className="form-control"/>
                          </div>
                          </div>
                        </div>
                          <div className="form-group">
                              {this.state.buttonstate==false && (<button className="blue-btn" onClick={() =>{ this.paynow() }}>Pay Now</button>)}
                              {this.state.buttonstate==true && (<button disabled className="blue-btn">Processing</button>)}
                          </div>
                          <div className="form-group">
                              <span style={{color:'#f00', display:'block', textAlign:'center', marginTop:'10px', fontSize:'16px'}}>Total Amount:${this.calculateprice()}.00</span>
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
          <SplitFieldsForm userData={this.props.userData} orderdetails={this.props.orderdetails} pageRender={this.props.pageRender}/>
        </Elements>
      </StripeProvider>
    );
  }
}


function mapStateToProps(state){
  return{
      orderdetails:state.orderdetails,
      userData:state.userData,
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setOrderDetails:setOrderDetails }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(OrderBundle3);