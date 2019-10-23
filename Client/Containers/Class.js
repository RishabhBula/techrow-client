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


import ClassTheater from '../Components/ClassTheater';
import ClassIndividual from '../Components/ClassIndividual';

class Class extends Component{
	constructor(props){
		super(props);
    this.state = {
      dalias:{},
      dstate:{}
    }
	}

  componentWillMount(){
    this.props.setClassMode(this.props.match.url.split("/")[1],this.props.match.params.id.split(":")[1],this.props.match.params.mode.split(":")[1])
    this.getDetails()
  }
  
  componentDidMount(){
      const socket = io('https://cinema.headjack.io/', {transports: ['polling'], upgrade: false});
      socket.on('connect', () => {
        console.log("socket connection established....socket id",socket.id); // 'G5p5...'
          if(socket.id){
              console.log("inside if")
              setTimeout(() =>{ 
                console.log("inside auth")
                socket.emit('appAuth', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId);
              },3000);
          }
      });
      

      socket.on('connect_error', (error) =>{ console.log("connect_error******",error) });
      socket.on('connect_timeout', (error) =>{ console.log("connect_timeout******",error) });
      socket.on('disconnect', (error) =>{ console.log("disconnect******",error) });
      socket.on('reconnecting', (error) =>{ console.log("reconnecting******",error) });
      socket.on('reconnect_failed', (error) =>{ console.log("reconnect_failed******",error) });

      socket.on('exception', (error) =>{ console.log("exception******",error) });
      socket.on('unauthorized', (error) =>{ console.log("unauthorized******",error) });

      socket.on('cinemaEnabled', (cinemaEnabled,status) =>{ console.log("cinemaEnabled",cinemaEnabled,status) })

        socket.on('appList', (appList) =>{ 
          // console.log("appList",appList) 
        })
        socket.on('deviceAliasList', (aliasList) =>{ 
          // console.log("deviceAliasList",aliasList)
          this.setState({dalias:aliasList})

        })
        socket.on('deviceStateList', (appId, state) =>{ 
          // console.log("deviceStateList",appId, state)
          this.setState({dstate:state})
          let arr1=[]
          Object.keys(state).forEach(data =>{
            arr1.push({id:data,status:Object(state)[data].status,persistentData:Object(state)[data].persistentData})
          })
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
        })


      //========dummy setup=======//

      // let deviceState={
      //   11111:{status:"connected"},
      //   22222:{status:"disconnected"},
      //   33333:{status:"playing"},
      //   44444:{status:"connected"}
      // }

      // let deviceAlias={11111:"device1",22222:"device2",33333:"device3",44444:"device4"}

      // let arr1=[]

      // Object.keys(deviceState).forEach(data =>{
      //   arr1.push({id:data,status:Object(deviceState)[data].status})
      // })

      // Object.keys(deviceAlias).forEach(data =>{
      //   arr1.forEach((item,key) =>{
      //     if(item.id==data){
      //       arr1[key].name=Object(deviceAlias)[data]
      //     }
      //     })
      // })

      // this.props.setIndividualdata(arr1)
      
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
    classMode:state.classMode,
    individualData:state.individualData.individualdata,
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setClassMode:setClassMode, setTheaterdata:setTheaterdata, setIndividualdata:setIndividualdata }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Class);