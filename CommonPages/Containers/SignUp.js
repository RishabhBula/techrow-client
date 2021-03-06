import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactGA from 'react-ga';

import SignupHeader from '../Components/SignupHeader';
import SignUp1 from '../Components/SignUp1';
import SignUp2 from '../Components/SignUp2';
import SignUp3 from '../Components/SignUp3';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    }
  }

  componentWillMount() {
    ReactGA.initialize('UA-83014470-1');
    ReactGA.pageview(window.location.href)
  }

  componentDidMount() {

  }

  pageRender(p) {
    this.setState({ page: p })
  }

  render() {
    return (
      <div className="full-page">
        <SignupHeader props={this.props} />
        <div className="inner-wrap">
          <div className="inner-blue-menu">
            <h1>Sign up your<br /> account</h1>
            <div>
              <h3>Questions?</h3>
              <a href="#/">Contact Us</a>
            </div>
          </div>
          <div className="inner-right-wrap">
            <div>
              {this.state.page == 1 && (<SignUp1 pageRender={this.pageRender.bind(this)} />)}
              {this.state.page == 2 && (<SignUp2 pageRender={this.pageRender.bind(this)} />)}
              {this.state.page == 3 && (<SignUp3 pageRender={this.pageRender.bind(this)} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {

  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(SignUp);