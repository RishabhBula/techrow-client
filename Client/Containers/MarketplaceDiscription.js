import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Spin, Icon } from 'antd';

import {setClassMode} from '../../actions/setClassMode';
import {setMarketdetails} from '../../actions/setMarketdetails';
import {Notification} from '../../CommonPages/Components/Notification';
import {getUserdata} from '../../actions/getUserdata'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

const antIcon = <Icon type="loading" style={{ fontSize: 24, color: '#262261' }} spin />;

class MarketplaceDiscription extends Component{
	constructor(props){
		super(props);
    this.state = {
        buttonloader:false,
    }
	}
  
  componentDidMount(){
    this.props.setClassMode(this.props.match.url.split("/")[1],"","theater")
    this.getDetails()
  }

  async getDetails(){
    try {
      let details = await firebase.firestore().collection('contents').doc(this.props.match.params.id.split(":")[1]).get()
      this.props.setMarketdetails(details.data())
    }
    catch (err) {
      console.log("Error==>", err)
    }
  }

  convertMS( milliseconds ) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
  }

  contactAccess(){
    // if(this.props.userData.contactContent.some( o => o==this.props.marketDetails.id)){
    //   console.log("you are already contacted to this content")
    //   Notification("error","Already Requested","You are already requested this content");
    // }else{
        this.setState({buttonloader:true})
        axios({
              method:"POST",
              url:'https://us-central1-techrow-platform.cloudfunctions.net/sendmail/contactcontent',
              data:{
                contentdetails:this.props.marketDetails,
                userdata:this.props.userData,
              }
            }).then((response) =>{
                console.log("-----response from server--->",response)
                const db=firebase.firestore();
                let contactcontent=this.props.userData.contactContent ? this.props.userData.contactContent : [] 
                contactcontent.push(this.props.marketDetails.id);
                let update={contactContent:contactcontent}
                db.collection("users").doc(this.props.userData.id).set(update, { merge: true })
                this.props.getUserdata(this.props.userData.id)
                Notification("success","Request sent","You have successfully requested for this content");
                this.setState({buttonloader:false})
            }).catch((err) =>{
                console.log("err-----err-err--->",err.response)
                Notification("error","Request failed","Something went wrong, request failed");
                this.setState({buttonloader:false})
            })
    // }
  }

  render(){
      return(
        <div className="full-page marketplace-item">
              <div className="inner-wrap">
                <div className="marketplace-banner" style={{backgroundColor:'#ff0000', backgroundImage:`url(${this.props.marketDetails.thumbnail})`}}>
                  <img src={this.props.marketDetails.thumbnail} className="img-fluid item-banner" alt="item-banner" />
                  <a href="#marketplace" className="back-btn"><Icon type="left" /> Back to marketplace</a>
                  { /* <a className="play-icon"><img src="../images/play-icon.png" className="img-fluid" alt="play-icon"/><span>Watch Trailer</span></a> */}
                  <div>
                  </div>
                </div>
                <div className="marketplace-content">
                  <div className="row">
                    <div className="col-md-8">
                      <h1>{this.props.marketDetails.name}</h1>
                      <p>{this.props.marketDetails.description}</p>
                      {this.state.buttonloader==false &&(<a className="green-btn" onClick={() =>{ this.contactAccess() }}>{this.props.userData.contactContent.includes(this.props.marketDetails.id) ? "Request Again" : "Contact to Access" }</a>)}
                      {this.state.buttonloader==true &&(<a className="green-btn" >{this.props.userData.contactContent.includes(this.props.marketDetails.id) ? "Request Again" : "Contact to Access" }<Spin indicator={antIcon} /></a>)}
                    </div>
                    <div className="col-md-4">
                      <h1>Credits</h1>
                      <ul>
                        <li>Category<span>{this.props.marketDetails.category}</span></li>
                        <li>Studio<span>{this.props.marketDetails.studioName}</span></li>
                        <li>Producers<span>{this.props.marketDetails.producers.map((item,index,array) => { return ( <text>{item}{array.length!=index+1 && (<text>, </text>) }</text>) })}</span></li>
                        <li>Directors<span>{this.props.marketDetails.director}</span></li>
                        <li>Time<span>{this.convertMS(this.props.marketDetails.duration).hour>0 ? `${this.convertMS(this.props.marketDetails.duration).hour} hr` : null } {this.convertMS(this.props.marketDetails.duration).minute} min</span></li>
                      </ul>
                    </div>
                  </div>
                  
                </div>
                 
              </div>
        </div>
      );
   }
}


function mapStateToProps(state){
  return{
    userData:state.userData,
    classMode:state.classMode,
    marketDetails:state.marketDetails

  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setClassMode:setClassMode, setMarketdetails:setMarketdetails, getUserdata:getUserdata }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MarketplaceDiscription);