import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import Sidemenu from '../Components/Sidemenu';
import MyLibrary from '../Components/MyLibrary.js';
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
              <Sidemenu/>
              <div className="inner-right-wrap">
                <MyLibrary/>
              </div>
          </div>
        </div>
      );
   }
}


function mapStateToProps(state){
  return{
    userData:state.userData
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);