const initialState = {
	id:""
}
export default function(state=initialState, action){
	switch(action.type){
		case 'USERDATA':
			return {
				...state,...action.payload
			}
		break;
	}
	return state
} 