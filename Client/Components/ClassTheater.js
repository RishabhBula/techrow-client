import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

class ClassTheater extends Component{
	constructor(props){
		super(props);
    this.state = {
      data:{}
    }
	}
  
  componentDidMount(){
      console.log("component 2",this.props)
  }


  render(){
      console.log("data",this.props.theaterData)
      return(
         <div className="dashboard animated fadeIn">
            <div className="row">
                <div className="col-md-8">
                  <div>
                    <iframe width="100%" height="400px" src={this.props.theaterData.previewUrl} frameBorder="0" allow="fullscreen" allowFullScreen > </iframe>
                  </div>
                  <div>
                    <p>{this.props.theaterData.description}</p>
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
    theaterData:state.theaterData.theaterdata
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ClassTheater);