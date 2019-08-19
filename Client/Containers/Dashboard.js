import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

class Dashboard extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }

  render(){
      return(
        <div className="full-page">
           <div style={{backgroundColor: 'white',display: 'flex',textAlign:'center'}}> 
              <h1>Dashboard</h1>
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