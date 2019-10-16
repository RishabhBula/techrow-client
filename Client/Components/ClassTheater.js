import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

class ClassTheater extends Component{
	constructor(props){
		super(props);
    this.state = {
      data:{}
    }
	}
  
  componentDidMount(){
      console.log("component 2",this.props.props)
      this.getDetails()
  }

  async getDetails(){
    try {
      let details = await firebase.firestore().collection('contents').doc(this.props.props.match.params.id.split(":")[1]).get()
      this.setState({data:details.data()})
    }
    catch (err) {
      console.log("Error==>", err)
    }
  }


  render(){
      console.log("data",this.state.data)
      return(
         <div className="dashboard animated fadeIn">
            <div className="row">
                <div className="col-md-8">
                  <div>
                    <iframe width="100%" height="400px" src={this.state.data.previewUrl} frameBorder="0" allow="fullscreen" allowFullScreen > </iframe>
                  </div>
                  <div>
                    <p>{this.state.data.description}</p>
                  </div>
                  <div>
                    <span>Play/Pause - Click anywhere on the player | Shortcut: K</span><br/>
                    <span>Fullscreen Mode - Double Click anywhere on the player | Shortcut: F</span><br/>
                    <span>Volume Up - Scrool Up anywhere on the player | Shortcut Up Arrow</span><br/>
                    <span>Volume Down - Scrool Down anywhere on the player | Shortcut Down Arrow</span><br/>
                  </div>
                </div>
                <div className="col-md-4">
                  
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
  return bindActionCreators({  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ClassTheater);