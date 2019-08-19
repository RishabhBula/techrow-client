const defaultState={
	loaded:false,
	auth:false,
	authData:{}
}
export default function (state=defaultState, action){
	//console.log("action-->",action)
	switch(action.type){
		case "GET_AUTH":
			return {...state,loaded:action.payload.loaded,auth:action.payload.auth,authData:action.payload.authData}
           break; 
          }		
	return state
}