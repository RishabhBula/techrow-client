import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import ReactGA from "react-ga";

import HomeHeader from "../Components/HomeHeader";
import { setActiveHeader } from "../../actions/setActiveHeader";
import { Notification } from "../../CommonPages/Components/Notification";
import { getSinglePost } from '../../actions/contentful'

class BlogDetail extends React.Component {
  state = {
    post_detail: null
  }

  componentDidMount(){
      console.log(this.props.match.params.slug)
      this.props.setActiveHeader("blog")
      getSinglePost(this.props.match.params.slug).then(post_detail => this.setState({ post_detail }));
  }

  fetchImage(postImage) {
    return postImage.postImage ? postImage.postImage.fields.file.url : "";
  }

  render() {
    return (
      <div className="full-page animated fadeIn ItemPage-page">
        <HomeHeader />
        <div className="container">
          <div className="row">
              {this.state.post_detail && this.state.post_detail.length ? (
                this.state.post_detail.map((post_det, index) => (
                  <div className="col-lg-12 blog-page" key={post_det.sys.id}>
                  <h2 className="post-detail-title">{post_det.fields.title}</h2>
                    <div className="post-detail-image">
                      { this.fetchImage(post_det.fields) != "" ? (
                          <img src={this.fetchImage(post_det.fields)}  className="img-fluid" />
                        ) : (''
                      )}
                    </div>
                    <div className="summary-content">{post_det.fields.summary}</div>
                  </div>
                ))
              ) : (
                <h3>Loading Post....</h3>
              )}
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setActiveHeader:setActiveHeader }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(BlogDetail);
