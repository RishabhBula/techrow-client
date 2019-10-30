import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
var moment = require('moment');
import ScrollView from 'react-inverted-scrollview';

import {Notification} from '../../CommonPages/Components/Notification';

class ClassTheater extends Component{
	constructor(props){
		super(props);
    this.state = {
      message:""
    }
	}
  
  componentWillMount(){
      // console.log("component 2",this.props)
      if(sessionStorage.chats){
        console.log("session msg exists")
      }else{
        console.log("no session msg")
        sessionStorage.setItem("chats", JSON.stringify([]));
      }
  }

  sendmessage(msgtext){
      // const socket = io('https://cinema.headjack.io/', {transports: ['polling'], upgrade: false});
      this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.cdevicesids, 'message', [msgtext]);
      let chat = JSON.parse(sessionStorage.getItem("chats"));
      chat.push({msg:msgtext,name:this.props.userData.firstName,createedDate:new Date()});
      sessionStorage.setItem("chats", JSON.stringify(chat));
      this.setState({message:""})
  }

  send(event){
    if (event.keyCode == 13 || event.which == 13){
                    if(this.state.message!=""){
                      if(this.props.cdevicesids.length>0){
                          this.sendmessage(this.state.message); 
                      }else{
                          Notification("error","No Devices are connected","No devices are connected to broadcast message.")
                      }
                    }
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
      // console.log("this.props++++====++++++",this.props)
      return(
         <div className="dashboard animated fadeIn theaterMode">
            <div className="row">
                <div className="col-md-12 col-lg-8 col-xl-9">
                  <div className="theaterModeData">
                    <div className="theaterVideo">
                      <iframe id="player" src={this.props.theaterData.previewUrl} frameBorder="0" allow="fullscreen" allowFullScreen > </iframe>
                    </div>
                    <div className="discription">
                      <p>{this.props.theaterData.description}</p>
                    </div>
                    <div>
                     {/* <span>Play/Pause - Click anywhere on the player | Shortcut: K</span><br/>
                      <span>Fullscreen Mode - Double Click anywhere on the player | Shortcut: F</span><br/>
                      <span>Volume Up - Scrool Up anywhere on the player | Shortcut Up Arrow</span><br/>
                      <span>Volume Down - Scrool Down anywhere on the player | Shortcut Down Arrow</span><br/>*/}
                      <h1>Credits</h1>
                        <ul>
                          <li>Studio : <span>{this.props.theaterData.studioName}</span></li>
                          <li>Director : <span>{this.props.theaterData.director}</span></li>
                          <li>Time : <span>{this.convertMS(this.props.theaterData.duration).hour>0 ? `${this.convertMS(this.props.theaterData.duration).hour} hr` : null } {this.convertMS(this.props.theaterData.duration).minute} min</span></li>
                        </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4 col-xl-3" >
                  <div className="message-wrap">
                    <div style={{display: 'block', textAlign:'center', backgroundColor: '#ebebeb80', borderRadius: '5px', padding: '15px'}}>
                     <span style={{color: 'white', fontSize :'18px'}}>Broadcast Messages</span>
                    </div>
                    <div className="message-list" style={{ overflowY: 'scroll' }}>
                    <ScrollView
                        width="100%"
                        height="100%"
                        ref={ref => (this.scrollView = ref)}
                    >
                      {JSON.parse(sessionStorage.chats).map((item,index) =>{ 
                        return( 
                          <div style={{padding: '20px', backgroundColor: 'white', borderRadius: 5, marginBottom: '10px', marginTop: '10px', fontSize: 12}}>
                           <div className="row" style={{paddingBottom: '10px'}}>
                            <span className="col-md-6" style={{color: '#9d9d9d'}}>{item.name}</span>
                            <span className="col-md-6" style={{display: 'block', textAlign:'right', color: '#bababa'}}>{moment(item.createedDate).fromNow()}</span>
                           </div>
                           <span>{item.msg}</span>
                          </div>
                        )})}
                      </ScrollView>
                    </div>
                    <div style={{margin: '10px', }}>
                      <input type="text" className="form-control" value={this.state.message} onChange={(e) =>{ this.setState({ message:e.target.value }) } } onKeyPress={(event) =>{ this.send(event) }}/>
                      <span style={{color: '#bababa', display: 'block', textAlign:'center', padding: '10px', fontSize: 12}}>Hit Enter to send</span>
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
    individualData:state.individualData.individualdata,
    theaterData:state.theaterData.theaterdata,
    userData:state.userData,
    selectedDevices:state.selectedDevices.selecteddevices
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ClassTheater);