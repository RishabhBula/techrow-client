import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import {setSignupDetails} from '../../actions/setSignupDetails';

class SignUp1 extends Component{
	constructor(props){
		super(props);
    this.state = {
      state1:"white",
      state2:"white",
      type:"",
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  next(){
    if(this.state.type==""){
        this.setState({error:true,errortext:"please select a user type"})
    }else{
        this.props.pageRender(2)
    }
  }

  render(){
      return(
        <div>
           <div>
                <div className="form-wrap">
                   <span>i am a/an</span>
                   <div className="row">
                      <div className="col-6 pointer" onClick={() =>{ this.setState({state1:"blue",state2:"white",type:"teacher/educator",error:false,errortext:""}); this.props.signupdetails.type="teacher/educator" }}>
                        <button style={{backgroundColor:this.state.state1}}>Teacher/Educator</button>
                      </div>
                      <div className="col-6 pointer" onClick={() =>{ this.setState({state1:"white",state2:"blue",type:"publisher",error:false,errortext:""}); this.props.signupdetails.type="publisher" }}>
                        <button style={{backgroundColor:this.state.state2}}>Publisher</button>
                      </div>
                   </div>
                   {this.state.error==true && (<div><span style={{color: 'red'}}>*{this.state.errortext}</span></div>)}
                   <span className="pointer" onClick={() =>{ this.next() }}>next</span>
                </div>
            </div>
        </div>
      );
   }
}


function mapStateToProps(state){
  return{
    signupdetails:state.signupdetails
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setSignupDetails:setSignupDetails }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(SignUp1);