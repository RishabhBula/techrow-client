const initialState = {
	selecteddevicestheater:[]
}
export default function(state=initialState, action){
	switch(action.type){
		case 'SELECTEDDEVICESTHEATER':
			return {
				...state,selecteddevicestheater:action.payload
			}
		break;
	}
	return state
} 