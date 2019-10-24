import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';

import {setMarketdetails} from '../../actions/setMarketdetails';

class MarketSearchContents extends Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  
  componentDidMount(){

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
      return(
         <div className="dashboard animated fadeIn">
          <div>
            <div className="classesList">
              {this.props.marketSearch.marketsearch.length==0 &&(<div style={{textAlign:'center',display: 'block'}} className="row">
               
                <span>No results found.!</span>

              </div>)}
              {this.props.marketSearch.marketsearch.length>0 &&(<div className="row">
                {this.props.marketSearch.marketsearch.map((item,index) =>{
                  return(
                    <div className="col-lg-3 col-md-4" key={item.id}>
                      <a onClick={() =>{ this.onItemClick(item) }} className="each-class">
                        <div className="class-banne-wrap">
                          <img src={item.thumbnail} className="img-fluid class-banner" />
                        </div>
                        <h3>{item.name}</h3>
                        <p>{this.trimm(item.description)}</p>
                      </a>
                    </div>)
                })}
              </div>)}
             </div>
          </div>
         </div>
      );
   }
}


function mapStateToProps(state){
  return{
    userData:state.userData,
    auth:state.auth,
    marketSearch:state.marketSearch
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({ setMarketdetails:setMarketdetails }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MarketSearchContents);