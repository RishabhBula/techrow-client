import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
var moment = require('moment');

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
      const socket = io('https://cinema.headjack.io/', {transports: ['polling'], upgrade: false});
      socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.selectedDevices, 'message', [msgtext]);
      let chat = JSON.parse(sessionStorage.getItem("chats"));
      chat.push({msg:msgtext,name:this.props.userData.firstName,createedDate:new Date()});
      sessionStorage.setItem("chats", JSON.stringify(chat));
      this.setState({message:""})
  }

  send(event){
    if (event.keyCode == 13 || event.which == 13){
                    if(this.state.message!=""){
                      if(this.props.selectedDevices.length>0){
                          this.sendmessage(this.state.message); 
                      }else{
                          Notification("error","No Devices Selected","Please select devices to send message.")
                      }
                    }
                }
  }

  render(){
      // console.log("this.props++++====++++++",this.props)
      return(
         <div className="dashboard animated fadeIn">
            <div className="row">
                <div className="col-md-9">
                  <div>
                    <iframe id="player" width="100%" height="450px" src={this.props.theaterData.previewUrl} frameBorder="0" allow="fullscreen" allowFullScreen > </iframe>
                  </div>
                  <div>
                    <p>{this.props.theaterData.description}</p>
                  </div>
                  <div>
                    <span>Play/Pause - Click anywhere on the player | Shortcut: K</span><br/>
                    <span>Fullscreen Mode - Double Click anywhere on the player | Shortcut: F</span><br/>
                    <span>Volume Up - Scrool Up anywhere on the player | Shortcut Up Arrow</span><br/>
                    <span>Volume Down - Scrool Down anywhere on the player | Shortcut Down Arrow</span><br/>
                  </div>
                </div>
                <div className="col-md-3" style={{backgroundColor: '#262161', borderRadius: 5, paddingTop: '5px'}}>
                  <div style={{display: 'block', textAlign:'center', backgroundColor: '#ebebeb80', borderRadius: '5px', padding: '10px'}}>
                   <span style={{color: 'white'}}>Broadcast Messages</span>
                  </div>
                  <div style={{ height: '500px', overflowY: 'scroll' }}>
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
                  </div>
                  <div style={{marginTop: '5px'}}>
                    <input type="text" className="form-control" value={this.state.message} onChange={(e) =>{ this.setState({ message:e.target.value }) } } onKeyPress={(event) =>{ this.send(event) }}/>
                    <span style={{color: '#bababa', display: 'block', textAlign:'center', padding: '10px', fontSize: 12}}>Hit Enter to send</span>
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