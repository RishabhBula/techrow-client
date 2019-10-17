const initialState = {
	individualdata:{}
}
export default function(state=initialState, action){
	switch(action.type){
		case 'INDIVIDUALDATA':
			return {
				...state,individualdata:action.payload
			}
		break;
	}
	return state
} 