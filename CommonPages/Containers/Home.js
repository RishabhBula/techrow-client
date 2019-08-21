import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import HomeHeader from '../Components/HomeHeader';

class Home extends Component{
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
           <HomeHeader/>
            <section className="home-banner">
              <div className="container">
                <h1>The Power of Immersive Technology</h1>
              </div>
            </section>

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
export default connect(mapStateToProps, matchDispatchToProps)(Home);