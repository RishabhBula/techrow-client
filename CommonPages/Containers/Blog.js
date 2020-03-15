import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactGA from 'react-ga';

import HomeHeader from '../Components/HomeHeader';
import {setActiveHeader} from '../../actions/setActiveHeader';
import {Notification} from '../../CommonPages/Components/Notification';
import * as contentful from 'contentful'
// var client = contentful.createClient({
//   space: '6u5tx5bx5r35',
//   accessToken: 'VfySsVoNol4Uhtj480qSbOfOyxpmKQzvXxiueS2ovTU' })
//   client.getEntries().then(entries => {
//   entries.items.forEach(entry => {
//     if(entry.fields) {
//       console.log(entry.fields)
//     }
//   })
// })

class Blog extends React.Component{
  state = {
    posts: []
  }
  client = contentful.createClient({
    space: '6u5tx5bx5r35',
    accessToken: 'VfySsVoNol4Uhtj480qSbOfOyxpmKQzvXxiueS2ovTU'
  })

  componentWillMount(){
      ReactGA.initialize('UA-83014470-1');
      ReactGA.pageview(window.location.href)
  }

  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
  }

  fetchPosts = () => this.client.getEntries()
  setPosts = response => {
    this.setState({
      posts: response.items
    })
  }

  render(){
      return(
        <div className="full-page animated fadeIn blog-page">
           <HomeHeader/>
            <section className="about-this banner">
              <div className="container cnt-area">
                <div className="row">
                  <div className="col-md-6 cnt-area-lft">
                    <h2>Blog Page</h2>
                    <p>
                    { this.state.posts.map(({fields}, i) =>
                      <pre key={i}>{JSON.stringify(fields, null, 2)}</pre>
                    )
                  }
                    </p>
                  </div>
                </div>
              </div>
            </section>
        </div>
      );
   }
}


function mapStateToProps(state){
  return{

  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setActiveHeader:setActiveHeader }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Blog);
