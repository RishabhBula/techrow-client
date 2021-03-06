import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

import Sidemenu from '../Components/Sidemenu';

import {setClassMode} from '../../actions/setClassMode';
import {setTheaterdata} from '../../actions/setTheaterdata';
import {setIndividualdata} from '../../actions/setIndividualdata';
import {setSelecteddevices} from '../../actions/setSelecteddevices';
import {setSelecteddevicestheater} from '../../actions/setSelecteddevicestheater';

import {Notification} from '../../CommonPages/Components/Notification';
import ClassTheater from '../Components/ClassTheater';
import ClassIndividual from '../Components/ClassIndividual';
import { Switch, Route } from 'react-router-dom';

class Class extends Component{
	constructor(props){
		super(props);
    this.state = {
      dalias:{},
      dstate:{},
      cdevicesids:[],
      socket:null,
      playerState:0
    }
	}

  componentWillMount(){
    this.props.setClassMode(this.props.match.url.split("/")[1],this.props.match.params.id,this.props.match.params.mode)
    this.getDetails()
     window.scrollTo(0,0);
  }
  
  componentDidMount(){
      const socket = io('https://cinema.headjack.io/', {transports: ['polling'], upgrade: false});
      this.setState({socket:socket})
      socket.on('connect', () => {
       // console.log("socket connection established....socket id",socket.id); // 'G5p5...'
          if(socket.id){
              // console.log("inside if")
              setTimeout(() =>{ 
                // console.log("inside auth")
                socket.emit('appAuth', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId);
                socket.emit('enableAppCinema', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, true);
                socket.emit('resetAppCountDown', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId);
              },2000);
          }
      });
      
      //------error-log------//

      socket.on('connect_error', (error) =>{ 
        // Notification("error","Reconnect","Reconnecting failed."); 
        console.log("connect_error******// server connection failed",error) 
      });

      socket.on('connect_timeout', (error) =>{ 
        // Notification("error","Reconnect","Reconnecting timed out"); 
        console.log("connect_timeout******// server connection failed",error) 
      });

      socket.on('disconnect', (error) =>{  
         // console.log("disconnect******// server connection failed== disconnected from server!",error);
         this.props.setIndividualdata([]);
         this.props.setSelecteddevices([]);
         // Notification("error","Disconnect","Disconnected from server");
      });

      socket.on('reconnecting', (error) =>{ 
        // Notification("error","Reconnect","Reconnecting to server..."); 
        console.log("reconnecting******// server connection failed",error) 
      });

      socket.on('reconnect_failed', (error) =>{ 
        // Notification("error","Reconnect","Reconnecting failed"); 
        console.log("reconnect_failed******// server connection failed",error) 
      });

      socket.on('error', (error) =>{ console.log("error******//received exception from server",error) });

      //------error-log------//

      socket.on('exception', (error) =>{ 
        // Notification("error","Error","Something wrong with connected to server. Please contact our support."); 
        console.log("exception******//received exception from server",error) 
      });
      socket.on('unauthorized', (error) =>{ console.log("unauthorized******",error) });

      socket.on('cinemaEnabled', (cinemaEnabled,status) =>{ 
         // console.log("cinemaEnabled",cinemaEnabled,status); 
         if(status==false){ 
          this.state.socket.emit('enableAppCinema', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, true);
          this.state.socket.emit('resetAppCountDown', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId);
        } 
      })

        socket.on('appList', (appList) =>{ 
          // console.log("logged")
          // console.log("appList",appList)
          // Notification("success","Success","Connected to server successfully");
        })
        socket.on('deviceAliasList', (aliasList) =>{ 
          // console.log("deviceAliasList",aliasList)
          this.setState({dalias:aliasList})

        })
        socket.on('deviceStateList', (appId, state) =>{ 
          // console.log("deviceStateList",appId, state)
          this.setState({dstate:state})
          let arr1=[];
          let arr2=[];
          Object.keys(state).forEach(data =>{
            arr1.push({id:data,status:Object(state)[data].status,persistentData:Object(state)[data].persistentData})
            arr2.push(data)
          })
          this.setState({cdevicesids:arr2})
          // console.log("arrayyyyyyyyyyy",arr1)
          if(this.state.dalias){
            Object.keys(this.state.dalias).forEach(data =>{
              arr1.forEach((item,key) =>{
                if(item.id==data){
                  arr1[key].name=Object(this.state.dalias)[data]
                }
                })
            })
          }
          this.props.setIndividualdata(arr1)


          //------removing selected array from refreshed list----//

          // let arr3=this.props.selectedDevices;
          if(this.props.selectedDevices.length>0){

            // this.props.selectedDevices.forEach((data,key) =>{
            //   console.log("in array",data)
            //     const a=arr1.some(item =>{ if(item.id==data){return true}else{return false} })
            //     console.log("A",a)
            //     if(a==false){
            //       arr2.splice(key,1)
            //       this.props.setSelecteddevices(arr2)
            //     }
            // })
//------
            // let tmpar = [];
            // for(var i = 0; i < arr3.length; i++){
            //   if(arr2.indexOf(arr3[i]) !== -1){
            //     tmpar.push(arr3[i]);
            //   }
            // }
            // this.props.setSelecteddevices(tmpar)
//------
            // const result = arr3.filter(word => arr2.indexOf(word)!=-1);
            // console.log("result",result)
            // this.props.setSelecteddevices(result)
//------
            const result = this.props.selectedDevices.filter(word => arr2.includes(word));
            console.log("result",result)
            this.props.setSelecteddevices(result)

            const result2 = this.props.selectedDevicestheater.filter(word => arr2.includes(word));
            console.log("result",result)
            this.props.setSelecteddevicestheater(result2)

          }

          //------removing selected array from refreshed list----//

        })


  }
  playerStatechange(count){
    // console.log("count",count)
    this.setState({playerState:count})
  }

  async getDetails(){
    try {
      // let details = await firebase.firestore().collection('contents').doc(this.props.match.params.id.split(":")[1]).get()
      let details = await firebase.firestore().collection('users').doc(this.props.auth.authData.uid).collection('myLibrary').doc(this.props.match.params.id).get()
      this.props.setTheaterdata(details.data())
    }
    catch (err) {
      console.log("Error==>", err)
    }
  }

  componentWillUnmount(){
    this.state.socket.disconnect();
    this.props.setTheaterdata({})
  }

  render(){
      return(
            <div>
              {/* <Sidemenu playerState={this.state.playerState} cdevicesids={this.state.cdevicesids} socket={this.state.socket}/> */}
              <div>
                <Switch>
                  <Route exact path="/class/:id/theater">
                    <ClassTheater playerStatechange={this.playerStatechange.bind(this)} playerState={this.state.playerState} cdevicesids={this.state.cdevicesids} socket={this.state.socket} />
                  </Route>
                  <Route exact path="/class/:id/individual">
                    <ClassIndividual socket={this.state.socket} />
                  </Route>
                </Switch>
                {/* {this.props.classMode.mode=="theater" &&(<ClassTheater playerStatechange={this.playerStatechange.bind(this)} playerState={this.state.playerState} cdevicesids={this.state.cdevicesids} socket={this.state.socket}/>)}
                    {this.props.classMode.mode=="individual" &&(<ClassIndividual socket={this.state.socket}/>)} */}
              </div>
            </div>
      );
   }
}


function mapStateToProps(state){
  return{
    auth:state.auth,
    headjackreducer:state.headjackreducer,
    userData:state.userData,
    classMode:state.classMode,
    individualData:state.individualData.individualdata,
    selectedDevices:state.selectedDevices.selecteddevices,
    selectedDevicestheater:state.selectedDevicestheater.selecteddevicestheater
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setClassMode:setClassMode, setTheaterdata:setTheaterdata, setIndividualdata:setIndividualdata, setSelecteddevices:setSelecteddevices, setSelecteddevicestheater:setSelecteddevicestheater }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Class);