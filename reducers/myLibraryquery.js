const initialState = {
	    query:"",
	    limit:0
}
export default function(state=initialState, action){
	switch(action.type){
		case 'MYLIBRARYQUERY':
			return {...state, query:action.query, limit:action.limit}
		break;
	}
	return state
} 