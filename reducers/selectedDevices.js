const initialState = {
	selecteddevices:[]
}
export default function(state=initialState, action){
	switch(action.type){
		case 'SELECTEDDEVICES':
			return {
				...state,selecteddevices:action.payload
			}
		break;
	}
	return state
} 