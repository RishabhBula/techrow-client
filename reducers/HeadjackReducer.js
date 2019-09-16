const initialState = {
	projects:{}
}
export default function(state=initialState, action){
	switch(action.type){
		case 'PROJECT':
			return {
				...state,projects:action.payload
			}
		break;
	}
	return state
} 