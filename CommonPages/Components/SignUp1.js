import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import {setSignupDetails} from '../../actions/setSignupDetails';

class SignUp1 extends Component{
	constructor(props){
		super(props);
    this.state = {
      state1:"#fff",
      state2:"#fff",
      type:"",
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  next(){
    if(this.state.type==""){
        this.setState({error:true,errortext:"Please select a user type"})
    }else{
        this.props.pageRender(2)
    }
  }

  render(){
      console.log("=====",this.props.signupdetails)
      return(
        <div>
           <div>
                <h4></h4>
                <div className="form-wrap signup-wrap animated fadeIn">
                   <h5>I am a/an</h5>
                   <div className="user-type-select">
                   <div className="row">
                      <div className="col-6">
                        <div className="signin-opt" onClick={() =>{ this.setState({state1:"#B1F543",state2:"#fff",type:"teacher/educator",error:false,errortext:""}); this.props.signupdetails.type="teacher/educator" }}
                          style={{borderColor:this.state.state1}}
                        >
                          
                          <img src={this.props.signupdetails.type=="teacher/educator"?"./images/man-and-tie.png":"./images/man-and-tie-grey.png"} className="img-fluid" alt="study"/>
                          <h5 >Teacher/Educator</h5>
                          <p>I want to bring Virtual Reality into my classroom/school. I want access to hours of learning contents and well-structured, standards-aligned lesson plan</p>
                        </div>
                      </div>
                      <div className="col-6 ">
                        <div className="signin-opt"  style={{background:'none', opacity:'.3', border:'none', cursor:'default' }}onClick={() =>{ {/*this.setState({state1:"#fff",state2:" #B1F543",type:"publisher",error:false,errortext:""}); this.props.signupdetails.type="publisher"*/} }} >
                          <img src={this.props.signupdetails.type=="publisher"?"./images/study.png":"./images/study grey.png"} className="img-fluid" alt="study"/>
                          <h5 >"Publisher"</h5 >
                          <p>Coming Soon...</p>
                        </div>
                      </div>
                   </div>
                  </div>
                   {this.state.error==true && (<div><span style={{color: 'red'}}>{this.state.errortext}</span></div>)}
                   <button onClick={() =>{ this.next() }}>Next <img src="./images/arrow-right.png" className="img-fluid"/></button>
                   <div className="clearfix"></div>
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