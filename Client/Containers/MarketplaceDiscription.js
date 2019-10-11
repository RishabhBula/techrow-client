import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Icon } from 'antd';

import {setClassMode} from '../../actions/setClassMode';
import {setMarketdetails} from '../../actions/setMarketdetails';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

class MarketplaceDiscription extends Component{
	constructor(props){
		super(props);
    this.state = {
      
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

  render(){
      return(
        <div className="full-page marketplace-item">
              <div className="inner-wrap">
                <div className="marketplace-banner">
                  <img src={this.props.marketDetails.thumbnail} className="img-fluid item-banner" alt="item-banner" />
                  <a href="#marketplace" className="back-btn"><Icon type="left" /> Back to Search Result</a>
                  <a className="play-icon"><img src="../images/play-icon.png" className="img-fluid" alt="play-icon"/><span>Watch Trailer</span></a>
                  <div>
                  </div>
                </div>
                <div className="marketplace-content">
                  <div className="row">
                    <div className="col-md-8">
                      <h1>{this.props.marketDetails.name}</h1>
                      <p>{this.props.marketDetails.description}</p>
                      <a className="green-btn">Contact to Access</a>
                    </div>
                    <div className="col-md-4">
                      <h1>Credits</h1>
                      <ul>
                        <li>Studio<span>{this.props.marketDetails.studioName}</span></li>
                        <li>Producers<span>{this.props.marketDetails.producers.map((item,index,array) => { return ( <text>{item}{array.length!=index+1 && (<text>, </text>) }</text>) })}</span></li>
                        <li>Director<span>{this.props.marketDetails.director}</span></li>
                        <li>Time<span>{this.convertMS(this.props.marketDetails.duration).hour} hr {this.convertMS(this.props.marketDetails.duration).minute} min</span></li>
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
  return bindActionCreators({ setClassMode:setClassMode, setMarketdetails:setMarketdetails }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MarketplaceDiscription);