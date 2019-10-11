import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import {setClassMode} from '../../actions/setClassMode';

class MarketplaceDiscription extends Component{
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
        <div className="full-page marketplace-item">
              <div className="inner-wrap">
                <div className="marketplace-banner">
                  <img src="../images/item-banner.jpg" className="img-fluid item-banner" alt="item-banner" />
                  <a href="#" className="back-btn"> Back to Search Result</a>
                  <a className="play-icon"><img src="../images/play-icon.png" className="img-fluid" alt="play-icon"/><span>Watch Trailer</span></a>
                  <div>
                  </div>
                </div>
                <div className="marketplace-content">
                  <div className="row">
                    <div className="col-md-8">
                      <h1>A History of Histories</h1>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                      <a href="#" className="green-btn">Contact to Access</a>
                    </div>
                    <div className="col-md-4">
                      <h1>Credits</h1>
                      <ul>
                        <li>Studio<span>Lorem ipsum dolor</span></li>
                        <li>Producers<span>Lorem ipsum dolor</span></li>
                        <li>Director<span>Lorem ipsum dolor</span></li>
                        <li>Time<span>Lorem ipsum dolor</span></li>
                      </ul>
                    </div>
                  </div>
                  
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
export default connect(mapStateToProps, matchDispatchToProps)(MarketplaceDiscription);