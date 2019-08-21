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
    
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);