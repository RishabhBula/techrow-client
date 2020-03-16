import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import ReactGA from "react-ga";

import HomeHeader from "../Components/HomeHeader";
import { setActiveHeader } from "../../actions/setActiveHeader";
import { Notification } from "../../CommonPages/Components/Notification";
import { getBlogPosts } from '../../actions/contentful'

class Blog extends React.Component {
  state = {
    posts: null
  }

  componentDidMount(){
      console.log('Blog Page')
      this.props.setActiveHeader("blog")
      getBlogPosts().then(posts => this.setState({ posts }));
  }

  fetchImage(postImage) {
    return postImage.postImage ? postImage.postImage.fields.file.url : "";
  }
  render() {
    return (
      <div className="full-page animated fadeIn blog-page">
        <HomeHeader />
        <div className="container">
          <div className="row">
            {this.state.posts && this.state.posts.length ? (
                this.state.posts.map((post, index) => (
                  <div className="col-lg-4 blog_cards" key={post.sys.id}>
                  <div className="card" >
                    <a href={"#/blog/" + post.fields.slug}>
                        { this.fetchImage(post.fields) != "" ? (
                          <img src={this.fetchImage(post.fields)}  className="card-img-top" />
                        ) : (
                          <img src="./images/techrow-logo.png" className="card-img-top" />
                        )}
                      </a>
                      <div class="card-body">
                        <h4 class="card-title">{post.fields.title.substring(0, 40)}</h4>
                        <p class="card-text">{post.fields.summary.substring(0, 50)}..</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h3>Loading Blog Posts...</h3>
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
export default connect(mapStateToProps, matchDispatchToProps)(Blog);
