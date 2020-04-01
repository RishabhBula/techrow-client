import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const CLIENT_ID = '5e7531d798cabfc868194676';
const CLIENT_SECRET = 'dKJsJmhDoJVHNioweMFR8tLVzMGU4So6auqxfBBqib8ojfpZBW';

class Academy extends Component {

  constructor(props) {
    super(props);
    this.state = { url: "" };
    this.lwLogin = this.lwLogin.bind(this);
  }

  // TODO: Change this to use redux, and also make it only call the first time the user logs in
  componentDidMount() {
    if (this.state.url == "") {
      this.lwLogin().then(result => {
        this.setState({
          url: result
        });
      })
    }
  }
  // TODO: Change this to use redux, and also make it only call the first time the user logs in
  componentDidUpdate() {
    if (this.state.url == "")
    {
      this.lwLogin().then(result => {
        this.setState({
          url: result
        });
      })
    }
  }

  async lwLogin() {
    // Need to validate whether or not user has a LW account, need to pass in new username if not.
    // For now users will sign UP for the academy separately, then be able to use single sign on.
    // We should also proxy the client_id and secret
    let email = this.props.userData.email;

    let lwToken = await this.getLWToken();
    return await this.performLWSignOn(email, lwToken);
  }

  async getLWToken() {
    const tokenRequest = await fetch("https://api.learnworlds.com/oauth2/access_token", {
      body: `data={\"client_id\":\"${CLIENT_ID}\",\"client_secret\":\"${CLIENT_SECRET}\",\"grant_type\":\"client_credentials\"}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Lw-Client": `${CLIENT_ID}`
      },
      method: "POST"
    });
    const tokenResponse = await tokenRequest.json();
    return tokenResponse.tokenData.access_token;
  }

  async performLWSignOn(email, token) {
    const ssoRequest = await fetch("https://api.learnworlds.com/sso", {
      body: `data={\"email\":\"${email}\", \"redirectUrl\":\"https://www.techrowacademy.org/start\"}`,
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
        "Lw-Client": `${CLIENT_ID}`
      },
      method: "POST"
    })
    const ssoResponse = await ssoRequest.json();
    return ssoResponse.url;
  }

  render() {

    let output;

    switch (this.state.url) {
      case "":
        output = <div className="loader"><Spin indicator={antIcon} /></div>
        break;
      case undefined:
        output = <h1>Error!</h1>// TODO: Make error message
        break;
      default:
        output = <div className="animated fadeIn">
                    <iframe src={this.state.url} width="100%" style={{ height: '100vh' }} frameBorder="0" allowFullScreen="allowfullscreen"></iframe>
                  </div>;
        break;
    }

    return output;
  }
}

function mapStateToProps(state) {
  return {
    userData: state.userData
  };
}

export default connect(mapStateToProps)(Academy);