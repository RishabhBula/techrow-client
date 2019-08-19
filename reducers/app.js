
const defaultState= {
  loading:false,
  api:"",
  err:""
}
export default function (state=defaultState,action) {
	switch(action.type){
		case "REQUEST_START":
    
      return {...state,loading:action.payload.loading,api:action.payload.api,err:action.payload.err};
    case "REQUEST_END":
      return {...state,loading:action.payload.loading,api:action.payload.api,err:action.payload.err};
    case "REQUEST_ERROR":
      return {...state,loading:action.payload.loading,api:action.payload.api,err:action.payload.err};
      default:
        return state
	}
}



