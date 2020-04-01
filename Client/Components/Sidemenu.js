import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setClassMode } from '../../actions/setClassMode';
import { TheaterSidemenu } from './TheaterSidemenu';
import { NavLink } from 'react-router-dom';


class Sidemenu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="inner-blue-menu">
        <div className="sidemenu-group">
          <NavLink exact to="/" activeClassName="ative">
            My Library
           </NavLink>

          <NavLink to="/marketplace">
            Marketplace
          </NavLink>
        </div>

        <div className="sidemenu-group">
          <a href="mailto: contact@techrow.org" target="_blank">Contact</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    classMode: state.classMode,
    userData: state.userData,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setClassMode: setClassMode }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Sidemenu);