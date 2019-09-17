import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import RecentContent from '../Components/RecentContent.js';

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
        setTimeout(() => { 
          if(socket.id){
            var auth = socket.emit('appAuth', '99de5d81f4ae87fed360f0bdccff7526', '1a459a172e2b3dd58bb60c78b6d68d7d7f91e1be5236dade');
            console.log("auth==auth==auth=authauth",auth)
          }
        }, 3000);

        
      });
      
      socket.on('exception', (exception) => {
        // handle message of type 'message_type' here
        console.log("'exception'==",'exception')
      });

      socket.on('unauthorized', (unauthorized) => {
        // handle message of type 'message_type' here
        console.log("unauthorized==",unauthorized)
      });

      socket.on('appList', (appList) => {
        // handle message of type 'message_type' here
        console.log("appList==",appList)
      });

      socket.on('deviceStateList', (deviceStateList) => {
        // handle message of type 'message_type' here
        console.log("deviceStateList==",deviceStateList)
      });

  }

  render(){
      return(
        <div className="full-page">
          <div className="inner-wrap"> 
                <div className="inner-blue-menu">
                    <h1>DASHBOARD</h1>
                </div>
                <div className="inner-right-wrap">
                    
                    <RecentContent/>
                </div>
             </div>
        </div>
      );
   }
}


function mapStateToProps(state){
  return{
    
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);