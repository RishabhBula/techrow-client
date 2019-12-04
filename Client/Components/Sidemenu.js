import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import {setClassMode} from '../../actions/setClassMode';


class Sidemenu extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      

  }

  togglemenu(mode){
    this.props.setClassMode("class",this.props.classMode.id,mode); 
    window.location.href = '#/class/:'+this.props.classMode.id+'/:'+mode;
  }

  render(){
      return(
        <div className="inner-blue-menu">
            {this.props.classMode.route=="" && (<div className="sidemenu-group">
              <a className="ative">My Library</a>
              <a href="#/marketplace">Marketplace</a>
            </div>)}
            {this.props.classMode.route=="class" && (
              <div className="sidemenu-group">
                <a className="backtomylibrary" href="#/"> <img src="/images/back-angle.png" className="img-fluid"/> My Library</a>
                <div className="my-library-modes">
                  <a className={this.props.classMode.mode=="individual" ? "ative": "" } onClick={() => { if(this.props.playerState==0){this.togglemenu("individual")}else{ if(window.confirm("video section not ended are you sure you to want to move?")){ this.props.socket.emit('sendAction', this.props.userData.headJackCredentials.appId, this.props.userData.headJackCredentials.authId, this.props.cdevicesids, 'stop', []); this.togglemenu("individual") }else{  } } }}><img src="/images/individual-icon.png" className="img-fluid" /><img src="/images/individual-icon-green.png" className="img-fluid" />Individual Mode</a>
                  <a className={this.props.classMode.mode=="theater" ? "ative": "" } onClick={() => { this.togglemenu("theater") }}><img src="/images/classroom-wt.png" className="img-fluid" /><img src="/images/classroom-green.png" className="img-fluid" />Theater</a>
                </div>
              </div>
            )}
            <div className="sidemenu-group">
              <a href = "mailto: contact@techrow.org" target="_blank">Contact</a>
              {/*<a>Settings</a>*/}
            </div>
        </div>
      );
   }
}


function mapStateToProps(state){
  return{
    classMode:state.classMode,
    userData:state.userData,
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setClassMode:setClassMode }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Sidemenu);