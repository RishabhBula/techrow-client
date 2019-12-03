import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactGA from 'react-ga';

import Sidemenu from '../Components/Sidemenu';
import MyLibrary from '../Components/MyLibrary.js';

import {setClassMode} from '../../actions/setClassMode';

class Dashboard extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}

  componentWillMount(){
      ReactGA.initialize('UA-83014470-1');
      ReactGA.pageview(window.location.href)
  }
  
  componentDidMount(){
    this.props.setClassMode(this.props.match.url.split("/")[1],"","theater")
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
    userData:state.userData,
    classMode:state.classMode

  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setClassMode:setClassMode }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);