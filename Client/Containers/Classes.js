import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import Sidemenu from '../Components/Sidemenu';
import ClassesContent from '../Components/ClassesContent';

class Classes extends Component{
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
                    <Sidemenu/>
                </div>
                <div className="inner-right-wrap">
                    
                    <ClassesContent/>
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
  return bindActionCreators({  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Classes);