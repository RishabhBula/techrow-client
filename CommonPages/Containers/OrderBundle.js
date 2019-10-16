import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import SignupHeader from '../Components/SignupHeader';
import OrderBundle1 from '../Components/OrderBundle1';
import OrderBundle2 from '../Components/OrderBundle2';
import OrderBundle3 from '../Components/OrderBundle3';
import OrderBundle4 from '../Components/OrderBundle4';
import OrderBundle5 from '../Components/OrderBundle5';

class OrderBundle extends Component{
	constructor(props){
		super(props);
    this.state = {
      page:2,
    }
	}
  
  componentDidMount(){
      console.log("props",this.props)
  }

  pageRender(p){
      this.setState({page:p})
  }

  render(){
      return(
        <div className="full-page">
           <SignupHeader props={this.props}/>
           <div className="inner-wrap"> 
              <div className="inner-blue-menu">
                    <h1>Order your<br/> bundle</h1>
                    <div>
                      <h3>Questions?</h3>
                      <a>Contact Us</a>
                    </div>
                </div>
              <div className="inner-right-wrap">
                  <div>
                        {this.state.page==1 && (<OrderBundle1 pageRender={this.pageRender.bind(this)} />)}
                        {this.state.page==2 && (<OrderBundle2 pageRender={this.pageRender.bind(this)} />)}
                        {this.state.page==3 && (<OrderBundle3 pageRender={this.pageRender.bind(this)} />)}
                        {this.state.page==4 && (<OrderBundle4 pageRender={this.pageRender.bind(this)} />)}
                        {this.state.page==5 && (<OrderBundle5 pageRender={this.pageRender.bind(this)} />)}
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