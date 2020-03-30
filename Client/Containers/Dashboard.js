import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactGA from 'react-ga';

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
     window.scrollTo(0,0);
  }

  render(){
      return(
        <MyLibrary/>
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