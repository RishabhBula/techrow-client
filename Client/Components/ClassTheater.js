import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table, Menu, Dropdown, Icon, Badge } from 'antd';
var moment = require('moment');
import ScrollView from 'react-inverted-scrollview';

import {Notification} from '../../CommonPages/Components/Notification';
import {setSelecteddevicestheater} from '../../actions/setSelecteddevicestheater';

class ClassTheater extends Component{
	constructor(props){
		super(props);
    this.state = {
      message:"",
      playerState:0,
      selecteddevices:[],
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

  componentDidMount(){
         const controller = OmniVirt.api;
         console.log("controller===controller",controller)
         controller.receiveMessage(window, 'started', (type, data, iframe) =>{ 
          console.log("====type, data, iframe====",type, data, iframe) 
          if(this.state.playerState==0){
          this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.cdevicesids, 'play', [this.props.theaterData.headjackProjectId])
          this.setState({playerState:this.state.playerState+1})
          }else{
            this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.cdevicesids, 'resume', []);
          }
        });

         controller.receiveMessage(window, 'paused', (type, data, iframe) =>{ 
          console.log("====type, data, iframe====",type, data, iframe) 
          this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.cdevicesids, 'pause', []);
        });

         controller.receiveMessage(window, 'ended', (type, data, iframe) =>{ 
          console.log("====type, data, iframe====",type, data, iframe) 
          this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.cdevicesids, 'stop', []);
        });

      
  }

  stop(){
    const controller = OmniVirt.api;
    const player = document.getElementById(this.props.theaterData.previewUrlID);
    this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.cdevicesids, 'stop', []);
    controller.sendMessage('seek', 0.0, player);
    controller.sendMessage('pause', null, player);
    this.setState({playerState:0})
  }

  // onSelectChange(selectedRowKeys, selectedRows){
  //    console.log("selectedRowKeys, selectedRows",selectedRowKeys, selectedRows)
  //    this.setState({selecteddevices:selectedRowKeys});
  //    this.props.setSelecteddevicestheater(selectedRowKeys)
  // }

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
      const columns = [
        {
          title: 'Name',
          render: (item) => { return <a>{item.persistentData.deviceModel}</a> },
        },
        {
          title: 'Status',
          render: (item) => { return <a>{item.status.name=='idle'? <Badge color="#B1F543" text="Connected"/> : <Badge color="blue" text={item.status.name}/> }</a> },
        },
      ];

      // const rowSelection = {
      //       selectedRowKeys:this.props.selectedDevicestheater,
      //       onChange: this.onSelectChange.bind(this),
      // };
      return(
         <div className="dashboard animated fadeIn theaterMode">
            <div className="row">
                <div className="col-md-12 col-lg-8 col-xl-9">
                  <div className="theaterModeData">
                    <div className="theaterVideo">

                      <iframe id={this.props.theaterData.previewUrlID} src={this.props.theaterData.previewUrl+"?player=true&autoplay=false"} frameBorder="0" width="1280" height="720" webkitallowfullscreen="1" mozallowfullscreen="1" allowFullScreen="1"></iframe>

                      {/*<iframe id="player" src={this.props.theaterData.previewUrl} frameBorder="0" allow="fullscreen" allowFullScreen > </iframe>*/}
                    </div>
                    <button onClick={() =>{ this.stop() }}>stop</button>
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
            <div className="headset-list" style={{paddingTop: '20px'}}>
              <Table locale={{ emptyText: ( <span>Waiting for first device to connect.</span> ) }}
                rowKey={(item) => { return item.id }} 
                columns={columns} 
                pagination={{ hideOnSinglePage: true,pageSize: 20 }}
                dataSource={this.props.individualData} />
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
    selectedDevices:state.selectedDevices.selecteddevices,
    selectedDevicestheater:state.selectedDevicestheater.selecteddevicestheater
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setSelecteddevicestheater:setSelecteddevicestheater }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ClassTheater);