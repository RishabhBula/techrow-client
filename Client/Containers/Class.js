import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import Sidemenu from '../Components/Sidemenu';

// import socket from '../../socketio/socketio';
import HeadjackAction from '../../actions/HeadjackAction';
import {setClassMode} from '../../actions/setClassMode';


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
  }
  
  componentDidMount(){
      // var socket = io('https://cinema.headjack.io/', {transports: ['polling'], upgrade: false});
      // socket.on('connect', () => {
      //   console.log("socket connection established....socket id",socket.id); // 'G5p5...'
      //     if(socket.id){
      //         setTimeout(() =>{ 
      //           var auth = socket.emit('appAuth', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId);
      //           console.log("auth======================auth",auth) 
      //         },3000);
      //     }
      // });
      
      // // socket.on('appList', this.props.applist);

      // socket.on('exception', (exception) =>{ console.log("exception******",exception) });
      // socket.on('unauthorized', (unauthorized) =>{ console.log("unauthorized******",unauthorized) });

      // // socket.on('deviceStateList', this.props.deviceStateList);

      // // socket.on('deviceAliasList', this.props.deviceAliasList);
      // socket.on('cinemaEnabled', (cinemaEnabled,status) =>{ console.log("cinemaEnabled",cinemaEnabled,status) })

      // socket.on('deviceAliasList', (deviceAliasList) =>{ console.log("deviceAliasList",deviceAliasList) })
      // socket.on('deviceStateList', (deviceStateList) =>{ console.log("deviceStateList",deviceStateList) })
      

  }

  render(){
      console.log("this.props..........",this.props)
      return(
        <div className="full-page">
          <div className="inner-wrap"> 
              <Sidemenu/>
              <div className="inner-right-wrap">
                {this.props.classMode.mode=="theater" &&(<ClassTheater props={this.props}/>)}
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
  return bindActionCreators({applist:HeadjackAction.appList, deviceStateList:HeadjackAction.deviceStateList, deviceAliasList:HeadjackAction.deviceAliasList, setClassMode:setClassMode }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Class);