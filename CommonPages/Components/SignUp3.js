import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {Select,Steps} from 'antd';
import Stepper from 'react-stepper-horizontal';

const { Step } = Steps;

const Option = Select.Option;

class SignUp3 extends Component{
	constructor(props){
		super(props);
    this.state = {
      schoolname:"",
      address:"",
      city:"",
      state:"",
      zipcode:"",
      grade:"",
      error:false,
      errortext:""
    }
	}
  
  componentDidMount(){
      
  }

  next(){
    if(this.state.schoolname=="" || this.state.address=="" || this.state.city=="" || this.state.state=="" || this.state.zipcode=="" || this.state.grade==""){
      this.setState({error:true,errortext:"please fill all fields to continue."})
    }else{
      this.props.pageRender(4)
    }
  }

  render(){
      return(
        <div>
           <div>
                <div>

                  {/*<Steps current={1}>
                    <Step status="wait"/>
                    <Step status="wait"/>
                    <Step status="wait"/>
                  </Steps>*/}

                  <Stepper 
                    steps={ [{}, {}, {}] } 
                    activeStep={ 1 }
                    activeColor="white"
                    completeColor="white"
                    defaultColor="white"
                    circleFontColor="black"
                    completeBarColor="#a9ff69"
                    lineMarginOffset={0} />

                </div>
                <span>Tell Us About Your School</span>
                <div style={{backgroundColor: '#fff'}}>
                   <div>
                      <label>schoolName</label><br/>
                          <input id="schoolname" type="schoolname" className="" placeholder="Your schoolname" value={this.state.schoolname} onChange={(e) =>this.setState({schoolname:e.target.value,error:false,errortext:""})}/><br/>
                      <label>Address</label><br/>
                          <input id="address" type="address" className="" placeholder="Your address" value={this.state.address} onChange={(e) =>this.setState({address:e.target.value,error:false,errortext:""})}/><br/>
                      <label>City</label><br/>
                          <input id="city" type="city" className="" placeholder="Your city" value={this.state.city} onChange={(e) =>this.setState({city:e.target.value,error:false,errortext:""})}/><br/>
                      <label>State</label><br/>
                          <input id="state" type="state" className="" placeholder="Your state" value={this.state.state} onChange={(e) =>this.setState({state:e.target.value,error:false,errortext:""})}/><br/>
                      <label>Zip Code</label><br/>
                          <input id="zipcode" type="zipcode" className="" placeholder="Set zipcode" value={this.state.zipcode} onChange={(e) =>this.setState({zipcode:e.target.value,error:false,errortext:""})}/><br/>
                      <label>Grades</label><br/>
                          <Select
                          showSearch
                          style={{ width: 200 }}
                          placeholder="Select Grade"
                          optionFilterProp="children"
                          value={this.state.grade}
                          onChange={(e) =>{this.setState({grade:e}) }}
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                            <Option value="A+">A+</Option>
                            <Option value="B+">B+</Option>
                            <Option value="C+">C+</Option>
                          </Select><br/>
                   </div>
                   {this.state.error==true && (<div><span style={{color: 'red'}}>*{this.state.errortext}</span></div>)}
                   <span className="pointer" onClick={() =>{ this.next() }}>Create Account</span>
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
export default connect(mapStateToProps, matchDispatchToProps)(SignUp3);