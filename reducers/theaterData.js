const initialState = {
	theaterdata:{}
}
export default function(state=initialState, action){
	switch(action.type){
		case 'THEATERDATA':
			return {
				...state,theaterdata:action.payload
			}
		break;
	}
	return state
} 