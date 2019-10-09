import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import MarketContents from '../Components/MarketContents';
import MarketFeaturedContents from '../Components/MarketFeaturedContents';

import {setClassMode} from '../../actions/setClassMode';

class Marketplace extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
    this.props.setClassMode(this.props.match.url.split("/")[1],"","theater")
  }

  render(){
      return(
        <div className="full-page">
              <div className="inner-wrap">
                <div className="marketplace">
                  <a href="#">Back to Dashboard</a>
                  <div className="form-group">
                    <input type="text" placeholder="Content Search" className="form-control"/>
                  </div>
                  <div>
                  </div>
                </div>
                 <MarketFeaturedContents/>
                 <MarketContents/>
                 
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
export default connect(mapStateToProps, matchDispatchToProps)(Marketplace);