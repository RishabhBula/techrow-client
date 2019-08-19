import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import SignupHeader from '../Components/SignupHeader';
import OrderBundle1 from '../Components/OrderBundle1';
import OrderBundle2 from '../Components/OrderBundle2';
import OrderBundle3 from '../Components/OrderBundle3';
import OrderBundle4 from '../Components/OrderBundle4';

class OrderBundle extends Component{
	constructor(props){
		super(props);
    this.state = {
      page:1,
    }
	}
  
  componentDidMount(){
      
  }

  pageRender(p){
      this.setState({page:p})
  }

  render(){
      return(
        <div>
           <SignupHeader/>
           <div style={{height: '800px'}} className="row"> 
              <div className="col-3" style={{backgroundColor: 'Blue'}}>
                  <span>Signup your account</span><br/>
                  <span>Questions?</span><br/>
                  <span>Contact Us</span><br/>
              </div>
              <div className="col-9" style={{backgroundColor: '#f1f8ff'}}>
                  <div>
                        <h4>Order Bundle</h4>
                        {this.state.page==1 && (<OrderBundle1 pageRender={this.pageRender.bind(this)} />)}
                        {this.state.page==2 && (<OrderBundle2 pageRender={this.pageRender.bind(this)} />)}
                        {this.state.page==3 && (<OrderBundle3 pageRender={this.pageRender.bind(this)} />)}
                        {this.state.page==4 && (<OrderBundle4 pageRender={this.pageRender.bind(this)} />)}
                  </div>
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
  return bindActionCreators({ }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(OrderBundle);