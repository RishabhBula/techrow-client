import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

class ClassTheater extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }


  render(){
      return(
         <div className="dashboard">
            <h1>TheaterMode</h1>
         </div>
      );
   }
}


function mapStateToProps(state){
  return{
    
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ClassTheater);