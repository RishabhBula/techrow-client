import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Slider from "react-slick";

class MarketFeaturedContents extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }


  render(){

    var settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      arrows:false,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode:true,
      autoplay:true
    };
      return(
         <div className="animated fadeIn">
            <div className="featured-slider">
              <Slider {...settings}>
                <div className="featured-slider-item">
                  <img src="../images/class-image.jpg" className="img-fluid" />
                  <div className="featured-slider-cnt">
                    <h2>Featured Content Tittle</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>
                    <h3>2 hr 40 min</h3>
                    <a href="#" className="green-btn">Contact to Access</a>
                  </div>
                </div>
                <div className="featured-slider-item">
                  <img src="../images/class-image.jpg" className="img-fluid" />
                  <div className="featured-slider-cnt">
                    <h2>Featured Content Tittle</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>
                    <h3>2 hr 40 min</h3>
                    <a href="#" className="green-btn">Contact to Access</a>
                  </div>
                </div>
                <div className="featured-slider-item">
                  <img src="../images/class-image.jpg" className="img-fluid" />
                  <div className="featured-slider-cnt">
                    <h2>Featured Content Tittle</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>
                    <h3>2 hr 40 min</h3>
                    <a href="#" className="green-btn">Contact to Access</a>
                  </div>
                </div>
                <div className="featured-slider-item">
                  <img src="../images/class-image.jpg" className="img-fluid" />
                  <div className="featured-slider-cnt">
                    <h2>Featured Content Tittle</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>
                    <h3>2 hr 40 min</h3>
                    <a href="#" className="green-btn">Contact to Access</a>
                  </div>
                </div>
                <div className="featured-slider-item">
                  <img src="../images/class-image.jpg" className="img-fluid" />
                  <div className="featured-slider-cnt">
                    <h2>Featured Content Tittle</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea </p>
                    <h3>2 hr 40 min</h3>
                    <a href="#" className="green-btn">Contact to Access</a>
                  </div>
                </div>
               
              </Slider>
            </div>
         </div>
      );
   }
}


function mapStateToProps(state){
  return{
    
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MarketFeaturedContents);