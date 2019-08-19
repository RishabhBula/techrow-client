import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

class LoginHeader extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }

  render(){
      return(
         <div className="row" style={{backgroundColor: 'white',display: 'flex',textAlign:'center'}}> 
            <div className="col-12" style={{textAlign: 'left' }}>
              <img style={{width:'100px',height: '30px'}} src="../images/techrow-logo.png" onClick={() =>{ window.location.href="#/" }}/>
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
export default connect(mapStateToProps, matchDispatchToProps)(LoginHeader);