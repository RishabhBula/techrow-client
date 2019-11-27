import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import Slider from "react-slick";

import {setMarketdetails} from '../../actions/setMarketdetails';

class MarketContents extends Component{
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
    var length = 55;
    var trimmedString = string.length > length ? 
                        string.substring(0, length - 3) + "..." : 
                        string;
    return trimmedString;
  }

  checkCategorylength(cat){
    const items=[]
    this.props.marketContent.marketcontent.forEach((item,index) =>{
      if(item.category==cat){
        items.push(item)
      }
    })
    return items.length
  }


  render(){

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      arrows:true,
      slidesToShow: 5,
      slidesToScroll: 1,
      centerMode:true,
      autoplay:false,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3.1,
            centerMode:true,
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow:2.5,
            centerMode:true,
          }
        }
      ]
    };

    var cat_slider_settings = {
      dots: false, 
      speed: 500,
      arrows:true,
      slidesToShow: 4,
      slidesToScroll: 1, 
      centerMode:true,
      autoplay:false,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3.1,
            centerMode:true,
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow:2.5,
            centerMode:true,
          }
        }
      ]
    };
      return(
         <div className=" animated fadeIn seience-slide">

            <h1>All Contents</h1>
            <div className="featured-slider">
              <Slider {...settings}>

              {this.props.marketContent.marketcontent.map((item,index) =>{
                  return(
                      <div className="featured-slider-item" key={item.id}>
                        <img src={item.thumbnail} className="img-fluid" />
                        <div className="featured-slider-cnt pointer" onClick={() =>{ this.onItemClick(item) }}>
                          <h2>{item.name}</h2>
                          <p>{this.trimm(item.description)}</p>
                          <h3>{this.convertMS(item.duration).hour} hr {this.convertMS(item.duration).minute} min</h3>
                        </div>
                      </div>
                  )}
              )}   

              </Slider>
            </div>

            {this.checkCategorylength("Science")>5 &&(<div>
            <h1>Science</h1>
            <div className="featured-slider cat_slider">
              <Slider {...cat_slider_settings}>

              {this.props.marketContent.marketcontent.map((item,index) =>{
                  return(
                    <div>
                      {item.category=="Science" && (<div className="featured-slider-item" key={item.id}>
                        <img src={item.thumbnail} className="img-fluid" />
                        <div className="featured-slider-cnt pointer" onClick={() =>{ this.onItemClick(item) }}>
                          <h2>{item.name}</h2>
                          <p>{this.trimm(item.description)}</p>
                          <h3>{this.convertMS(item.duration).hour} hr {this.convertMS(item.duration).minute} min</h3>
                        </div>
                      </div>)}
                    </div>
                  )}
              )}   

              </Slider>
            </div>
            </div>)}

            {this.checkCategorylength("History")>5 &&(<div>
            <h1>History</h1>
            <div className="featured-slider cat_slider">
              <Slider {...cat_slider_settings}>

              {this.props.marketContent.marketcontent.map((item,index) =>{
                  return(
                    <div>
                      {item.category=="History" && (<div className="featured-slider-item" key={item.id}>
                        <img src={item.thumbnail} className="img-fluid" />
                        <div className="featured-slider-cnt pointer" onClick={() =>{ this.onItemClick(item) }}>
                          <h2>{item.name}</h2>
                          <p>{this.trimm(item.description)}</p>
                          <h3>{this.convertMS(item.duration).hour} hr {this.convertMS(item.duration).minute} min</h3>
                        </div>
                      </div>)}
                    </div>
                  )}
              )}   

              </Slider>
            </div>
            </div>)}

            {this.checkCategorylength("World Affairs")>5 &&(<div>
            <h1>World Affairs</h1>
            <div className="featured-slider cat_slider">
              <Slider {...cat_slider_settings}>

              {this.props.marketContent.marketcontent.map((item,index) =>{
                  return(
                    <div>
                      {item.category=="World Affairs" && (<div className="featured-slider-item" key={item.id}>
                        <img src={item.thumbnail} className="img-fluid" />
                        <div className="featured-slider-cnt pointer" onClick={() =>{ this.onItemClick(item) }}>
                          <h2>{item.name}</h2>
                          <p>{this.trimm(item.description)}</p>
                          <h3>{this.convertMS(item.duration).hour} hr {this.convertMS(item.duration).minute} min</h3>
                        </div>
                      </div>)}
                    </div>
                  )}
              )}   

              </Slider>
            </div>
            </div>)}

            {this.checkCategorylength("Documentaries")>5 &&(<div>
            <h1>Documentaries</h1>
            <div className="featured-slider cat_slider">
              <Slider {...cat_slider_settings}>

              {this.props.marketContent.marketcontent.map((item,index) =>{
                  return(
                    <div>
                      {item.category=="Documentaries" && (<div className="featured-slider-item" key={item.id}>
                        <img src={item.thumbnail} className="img-fluid" />
                        <div className="featured-slider-cnt pointer" onClick={() =>{ this.onItemClick(item) }}>
                          <h2>{item.name}</h2>
                          <p>{this.trimm(item.description)}</p>
                          <h3>{this.convertMS(item.duration).hour} hr {this.convertMS(item.duration).minute} min</h3>
                        </div>
                      </div>)}
                    </div>
                  )}
              )}   

              </Slider>
            </div>
            </div>)}

            {this.checkCategorylength("Technology")>5 &&(<div>
            <h1>Technology</h1>
            <div className="featured-slider cat_slider">
              <Slider {...cat_slider_settings}>

              {this.props.marketContent.marketcontent.map((item,index) =>{
                  return(
                    <div>
                      {item.category=="Technology" && (<div className="featured-slider-item" key={item.id}>
                        <img src={item.thumbnail} className="img-fluid" />
                        <div className="featured-slider-cnt pointer" onClick={() =>{ this.onItemClick(item) }}>
                          <h2>{item.name}</h2>
                          <p>{this.trimm(item.description)}</p>
                          <h3>{this.convertMS(item.duration).hour} hr {this.convertMS(item.duration).minute} min</h3>
                        </div>
                      </div>)}
                    </div>
                  )}
              )}   

              </Slider>
            </div>
            </div>)}

         </div>
      );
   }
}


function mapStateToProps(state){
  return{
    marketContent:state.marketContent
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setMarketdetails:setMarketdetails }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MarketContents);