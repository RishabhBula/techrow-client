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

// import socket from '../../socketio/socketio';
import HeadjackAction from '../../actions/HeadjackAction';
import {setClassMode} from '../../actions/setClassMode';
import {setTheaterdata} from '../../actions/setTheaterdata';
import {setIndividualdata} from '../../actions/setIndividualdata';


import ClassTheater from '../Components/ClassTheater';
import ClassIndividual from '../Components/ClassIndividual';

class Class extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}

  componentWillMount(){
    this.props.setClassMode(this.props.match.url.split("/")[1],this.props.match.params.id.split(":")[1],this.props.match.params.mode.split(":")[1])
    this.getDetails()
  }
  
  componentDidMount(){
      var socket = io('https://cinema.headjack.io/', {transports: ['polling'], upgrade: false});
      socket.on('connect', (connect) => {
        console.log("socket connection established....socket id",socket.id); // 'G5p5...'
          if(socket.id){
              setTimeout(() =>{ 
                socket.emit('appAuth', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId);
              },3000);
          }
      });
      
      // socket.on('appList', this.props.applist);

      // socket.on('deviceStateList', this.props.deviceStateList);

      // socket.on('deviceAliasList', this.props.deviceAliasList);

      socket.on('exception', (error) =>{ console.log("exception******",error) });
      socket.on('connect_error', (error) =>{ console.log("connect_error******",error) });
      socket.on('unauthorized', (unauthorized) =>{ console.log("unauthorized******",unauthorized) });

      socket.on('cinemaEnabled', (cinemaEnabled,status) =>{ console.log("cinemaEnabled",cinemaEnabled,status) })
      setTimeout(() =>{ 
        socket.on('appList', (appList) =>{ console.log("appList",appList) })
        socket.on('deviceAliasList', (aliasList) =>{ console.log("deviceAliasList",aliasList) })
        socket.on('deviceStateList', (appId, state) =>{ console.log("deviceStateList",appId, state) })
      },6000);


      //========dummy setup=======//

      let deviceState={
        11111:{status:"connected"},
        22222:{status:"disconnected"},
        33333:{status:"playing"},
        44444:{status:"connected"}
      }

      let deviceAlias={11111:"device1",22222:"device2",33333:"device3",44444:"device4"}

      let arr1=[]

      Object.keys(deviceState).forEach(data =>{
        arr1.push({id:data,status:Object(deviceState)[data].status})
      })

      Object.keys(deviceAlias).forEach(data =>{
        arr1.forEach((item,key) =>{
          if(item.id==data){
            arr1[key].name=Object(deviceAlias)[data]
          }
          })
      })

      this.props.setIndividualdata(arr1)
      
      //========dummy setup=======//

  }

  async getDetails(){
    try {
      let details = await firebase.firestore().collection('contents').doc(this.props.match.params.id.split(":")[1]).get()
      this.props.setTheaterdata(details.data())
    }
    catch (err) {
      console.log("Error==>", err)
    }
  }

  render(){
      console.log("this.props..........",this.props)
      return(
        <div className="full-page">
          <div className="inner-wrap"> 
              <Sidemenu/>
              <div className="inner-right-wrap">
                {this.props.classMode.mode=="theater" &&(<ClassTheater/>)}
                {this.props.classMode.mode=="individual" &&(<ClassIndividual/>)}
              </div>
          </div>
        </div>
      );
   }
}


function mapStateToProps(state){
  return{
    headjackreducer:state.headjackreducer,
    userData:state.userData,
    classMode:state.classMode
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({applist:HeadjackAction.appList, deviceStateList:HeadjackAction.deviceStateList, deviceAliasList:HeadjackAction.deviceAliasList, setClassMode:setClassMode, setTheaterdata:setTheaterdata, setIndividualdata:setIndividualdata }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Class);