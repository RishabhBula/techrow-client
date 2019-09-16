import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import HeadjackAction from '../../actions/HeadjackAction'
class Dashboard extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      var socket = io('https://cinema.headjack.io/', {transports: ['polling'], upgrade: false});
      socket.on('connect', () => {
        console.log("socket connection established....socket id",socket.id); // 'G5p5...'
          if(socket.id){
            var auth = socket.emit('appAuth', 'd372c8c2095e877ba7b348b3238e9713', 'e45218888bdcfa98009f46372f367d2a7050b1dac0babbe6');
            console.log("auth======================auth",auth)
          }
      });
      
      socket.on('appList', this.props.applist);


      

  }

  render(){
      console.log("this.state.headjackreducerheadjackreducerheadjackreducer",this.props.headjackreducer)
      return(
        <div className="full-page">
          <div className="inner-wrap"> 
                <div className="inner-blue-menu">
                    <h1>DASHBOARD</h1>
                </div>
                <div className="inner-right-wrap">
                    <h4>DASHBOARD</h4>
                          
                </div>
             </div>
        </div>
      );
   }
}


function mapStateToProps(state){
  return{
    headjackreducer:state.headjackreducer
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({applist:HeadjackAction.appList }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);