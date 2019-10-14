import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

import MarketContents from '../Components/MarketContents';
import MarketFeaturedContents from '../Components/MarketFeaturedContents';
import MarketSearchContents from '../Components/MarketSearchContents';

import {setClassMode} from '../../actions/setClassMode';
import {setMarketcontent} from '../../actions/setMarketcontent';
import {setMarketfeature} from '../../actions/setMarketfeature';
import {setMarketsearch} from '../../actions/setMarketsearch';
import {setMarketsearchquery} from '../../actions/setMarketsearchquery';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

class Marketplace extends Component{
	constructor(props){
		super(props);
    this.state = {
       loading:false,
       search:"",
       searchshow:false
    }
	}
  
  componentDidMount(){
    this.props.setClassMode(this.props.match.url.split("/")[1],"","theater")
    if(this.props.marketSearchquery.query==""){
      this.getMarketplace()
    }
    else{
      this.setState({search:this.props.marketSearchquery.query,searchshow:true})
      this.search(this.props.marketSearchquery.query)
    }
  }

  async getMarketplace(){
      try {
          if(this.props.marketFeature.marketfeature.length==0 || this.props.marketContent.marketcontent.length==0 ){ this.setState({loading:true}) }
          let marketFeature =[];
          let marketContent =[];
          // let library = await firebase.firestore().collection('users').doc(this.props.auth.authData.uid).collection('myLibrary').get()
          let feature = await firebase.firestore().collection('contents').where('featured','==',true).get()
          let market = await firebase.firestore().collection('contents').get()
          console.log("library",feature.size)
          console.log("library",market.size)
                              feature.forEach((item) =>{
                                marketFeature.push(item.data())
                              })
                              market.forEach((item) =>{
                                marketContent.push(item.data())
                              })
          console.log("marketArray",marketFeature)
          console.log("marketArray",marketContent)
          this.props.setMarketfeature(marketFeature)
          this.props.setMarketcontent(marketContent)
          this.setState({loading:false})
          return marketFeature,marketContent

        }
        catch (err) {
            console.log("Error==>", err)
            this.setState({loading:false})
            return err
        }
  }

  search(s){
    console.log("this.state.search",this.state.search)
    this.props.setMarketsearchquery(s,0)
    // firebase.firestore().collection('users').doc(this.props.auth.authData.uid).collection('myLibrary').where('name', '>=', s).where('name', '<=', s+ '\uf8ff')
    firebase.firestore().collection('contents').where('searchQuery', '>=', s).where('searchQuery', '<=', s+ '\uf8ff')
    .get()
    .then((querySnapshot) => {
        let marketContent =[];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            marketContent.push(doc.data())
        });
        this.props.setMarketsearch(marketContent)
        // if(this.state.search==""){ this.setState({searchheader:false}) }else{ this.setState({searchheader:true}) }
        this.setState({searchshow:true})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        this.setState({searchshow:false})
    });
  }

  search2(event){
      if (event.keyCode == 13 || event.which == 13){
                    if(this.state.search!=""){ this.search(this.state.search); }
                }
  }

  render(){
      return(
        <div className="full-page">
             {this.state.loading==false ?  <div className="inner-wrap">
                <div className="marketplace">
                  <a href="#"><Icon type="caret-left" />Back to My Library</a>
                  <div className="form-group">
                    <input type="text" placeholder="Content Search" className="form-control" value={this.state.search} onChange={(e) =>{ this.setState({search:e.target.value}); if(e.target.value==""){ this.props.setMarketsearchquery("",0); this.setState({searchshow:false}); let data=[];this.props.setMarketsearch(data); this.getMarketplace() } }} onKeyPress={(event) =>{ this.search2(event) }}/>
                    <button onClick={() =>{ if(this.state.search!=""){ this.search(this.state.search) } }}><img src="../images/search-icon.png" className="img-fluid"/></button>
                  </div>
                  <div>
                  </div>
                </div>
                 {this.state.searchshow==false &&(<MarketFeaturedContents/>)}
                 {this.state.searchshow==false &&(<MarketContents/>)}
                 {this.state.searchshow==true &&(<MarketSearchContents/>)}
              </div>:<div className="classesList">
              <div className="row"> <div className="loader"><Spin indicator={antIcon} /></div> </div>
            </div>}
        </div>
      );
   }
}


function mapStateToProps(state){
  return{
    userData:state.userData,
    classMode:state.classMode,
    marketFeature:state.marketFeature,
    marketContent:state.marketContent,
    marketSearch:state.marketSearch,
    marketSearchquery:state.marketSearchquery
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setClassMode:setClassMode, setMarketcontent:setMarketcontent, setMarketfeature:setMarketfeature, setMarketsearch:setMarketsearch, setMarketsearchquery:setMarketsearchquery }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Marketplace);