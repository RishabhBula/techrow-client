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
  getSlickData(itemData,category){
    let returnItem=[]
    itemData.forEach((item) =>{
      if(item.category==category){
        returnItem.push(
          <div className="featured-slider-item" key={item.id}>
                        <img src={item.thumbnail} className="img-fluid" />
                        <div className="featured-slider-cnt pointer" onClick={() =>{ this.onItemClick(item) }}>
                          <h2>{item.name}</h2>
                          <p>{this.trimm(item.description)}</p>
                          <h3>{this.convertMS(item.duration).hour} hr {this.convertMS(item.duration).minute} min</h3>
                        </div>
                      </div>
                     
          )
      }
    })
    return returnItem;
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

            <h1>All Content</h1>
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

            {this.checkCategorylength("Science")>0 &&(<div>
            <h1>Science</h1>
            <div className="featured-slider cat_slider">
              <Slider {...cat_slider_settings}>

              {this.props.marketContent.marketcontent.length && this.getSlickData(this.props.marketContent.marketcontent,"Science")}   

              </Slider>
            </div>
            </div>)}

            {this.checkCategorylength("History")>0 &&(<div>
            <h1>History</h1>
            <div className="featured-slider cat_slider">
              <Slider {...cat_slider_settings}>

              {this.props.marketContent.marketcontent.length && this.getSlickData(this.props.marketContent.marketcontent,"History")}   

              </Slider>
            </div>
            </div>)}

            {this.checkCategorylength("World Affairs")>0 &&(<div>
            <h1>World Affairs</h1>
            <div className="featured-slider cat_slider">
              <Slider {...cat_slider_settings}>

              {this.props.marketContent.marketcontent.length && this.getSlickData(this.props.marketContent.marketcontent,"World Affairs")}   

              </Slider>
            </div>
            </div>)}

            {this.checkCategorylength("Documentaries")>0 &&(<div>
            <h1>Documentaries</h1>
            <div className="featured-slider cat_slider">
              <Slider {...cat_slider_settings}>

              {this.props.marketContent.marketcontent.length && this.getSlickData(this.props.marketContent.marketcontent,"Documentaries")}   

              </Slider>
            </div>
            </div>)}

            {this.checkCategorylength("Technology")>0 &&(<div>
            <h1>Technology</h1>
            <div className="featured-slider cat_slider">
              <Slider {...cat_slider_settings}>

              {this.props.marketContent.marketcontent.length && this.getSlickData(this.props.marketContent.marketcontent,"Technology")}   

              </Slider>
            </div>
            </div>)}

           {/* {this.checkCategorylength("Technology")>0 &&(<div>
            <h1>Technology</h1>
            <div className="featured-slider cat_slider row">
              {this.props.marketContent.marketcontent.length && this.getSlickData(this.props.marketContent.marketcontent)}
            </div>
            </div>)} */}

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