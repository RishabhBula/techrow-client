import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Slider from "react-slick";

import {setMarketdetails} from '../../actions/setMarketdetails';

class MarketFeaturedContents extends Component{
	constructor(props){
		super(props);
    this.state = {
      
    }
	}
  
  componentDidMount(){
      
  }

  convertMS( milliseconds ) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
  }

  onItemClick(item){
    this.props.setMarketdetails(item)
    window.location.href='#/marketplace/:'+item.id
  }

  trimm(a){
    var string = a;
    var length = 90;
    var trimmedString = string.length > length ? 
                        string.substring(0, length - 3) + "..." : 
                        string;
    return trimmedString;
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
      autoplay:true,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 2.3,
            centerMode:true,
          }
        },
        {
          breakpoint:769,
          settings: {
            slidesToShow:1,
            centerMode:true,
          }
        }
      ]
    };
      return(
         <div className="animated fadeIn">
            <div className="featured-slider">
              <Slider {...settings}>

                {this.props.marketFeature.marketfeature.map((item,index) =>{
                  return(
                      <div className="featured-slider-item" key={item.id}>
                        <img src={item.thumbnail} className="img-fluid" />
                        <div className="featured-slider-cnt pointer" onClick={() =>{ this.onItemClick(item) }}>
                          <h2>{item.name}</h2>
                          <p>{this.trimm(item.description)}</p>
                          <h3>{this.convertMS(item.duration).hour} hr {this.convertMS(item.duration).minute} min</h3>
                          <a onClick={() =>{ this.onItemClick(item) }} className="green-btn">Contact to Access</a>
                        </div>
                      </div>
                  )}
                )}
               
              </Slider>
            </div>
         </div>
      );
   }
}


function mapStateToProps(state){
  return{
    marketFeature:state.marketFeature
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setMarketdetails:setMarketdetails }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MarketFeaturedContents);