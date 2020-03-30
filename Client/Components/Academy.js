import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import Sidemenu from '../Components/Sidemenu';

class Academy extends Component {


  // componentDidMount() {

  // }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="full-page">
        <div className="inner-wrap">
          <Sidemenu />
          <div className="inner-right-wrap">
            <div className="animated fadeIn">
              <iframe src="http://www.techrowacademy.org/start" width="100%" style={{ height: '100vh' }} frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.userData,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Academy);