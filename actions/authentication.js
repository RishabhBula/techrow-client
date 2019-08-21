import * as env from '../env'
import axios from 'axios'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';

// var config = {
// apiKey: "AIzaSyDjk41ocT0Em1YG_C-6nXEcgCBHpjUsxMk",
// authDomain: "gradient-55daa.firebaseapp.com",
// databaseURL: "https://gradient-55daa.firebaseio.com",
// projectId: "gradient-55daa",
// storageBucket: "gradient-55daa.appspot.com",
// messagingSenderId: "830214997201"
// };

// firebase.initializeApp(config);

export function getAuthentication(){	

	return dispatch => {

    var unsubscribe = firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
        // User is signed in.
          dispatch({
                   type: 'GET_AUTH',
                   payload:{loaded:true,auth:true,authData:{}}
           })
          unsubscribe();
        // ...
      } else {
        // User is signed out.
          dispatch({
                   type: 'GET_AUTH',
                   payload:{loaded:true,auth:false,authData:{}}
           })
          unsubscribe();
        // ...
      }
    });
    
    // axios.get(env.apiURL+'users/isLogedIn?access_token='+localStorage.token)
    // .then((response) => {
      
    //       if(response.data.logged){
    //          axios.defaults.headers.common['Authorization'] = localStorage.token;
    //           dispatch({
    //                type: 'GET_AUTH',
    //                payload:{loaded:true,auth:true,authData:response.data}
    //       	})
    //       }else{
    //       	dispatch({
    //                type: 'GET_AUTH',
    //                payload:{loaded:true,auth:false,authData:{}}
    //       	})
    //       }     
    // }).catch(function (error) {
    //   console.log(error)
    //   dispatch({
    //                type: 'GET_AUTH',
    //                payload:{loaded:true,auth:false,authData:{}}
    //         })
    // });
  }
}