import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import ReactGA from "react-ga";

import HomeHeader from "../Components/HomeHeader";
import { setActiveHeader } from "../../actions/setActiveHeader";
import { Notification } from "../../CommonPages/Components/Notification";
import * as contentful from "contentful";

class Blog extends React.Component {
  state = {
    posts: []
  };
  client = contentful.createClient({
    space: "6u5tx5bx5r35",
    accessToken: "VfySsVoNol4Uhtj480qSbOfOyxpmKQzvXxiueS2ovTU"
  });

  componentWillMount() {
    ReactGA.initialize("UA-83014470-1");
    ReactGA.pageview(window.location.href);
  }

  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
  }

  fetchPosts = () => this.client.getEntries();
  setPosts = response => {
    this.setState({
      posts: response.items
    });
  };

  fetchImage(postImage) {
    console.log(postImage)
    return postImage.postImage ? postImage.postImage.fields.file.url : "";
  }
  render() {
    return (
      <div className="full-page animated fadeIn blog-page">
        <HomeHeader />
        <section className="about-this banner">
          <div className="container cnt-area">
            <div className="row">
              {this.state.posts && this.state.posts.length ? (
                this.state.posts.map((post, index) => (
                  <div className="col-lg-4 post" key={post.sys.id}>
                    <div className="post-image">
                      <a href={"#/" + post.fields.slug}>
                        { this.fetchImage(post.fields) != "" ? (
                          <img src={this.fetchImage(post.fields)}  className="img-fluid" />
                        ) : (
                          <img src="./images/techrow-logo.png" className="img-fluid" />
                        )}
                      </a>
                    </div>
                    <h2 className="post-title">{post.fields.title}</h2>
                    <div className="entry-content">{post.fields.summary}</div>
                  </div>
                ))
              ) : (
                <h3>Loading Blog Posts...</h3>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ setActiveHeader: setActiveHeader }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Blog);
