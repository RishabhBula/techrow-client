import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
class Sidemenu extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      

  }

  render(){
      return(
        <div>
            <div className="row">
              <a>Dashboard</a>
              <a>Classes</a>
              <a>Marketplace</a>
            </div>
            <div className="row">
              <a>Contact</a>
              <a>Settings</a>
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
export default connect(mapStateToProps, matchDispatchToProps)(Sidemenu);