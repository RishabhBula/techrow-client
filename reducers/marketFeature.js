const initialState = {
	marketfeature:[]
}
export default function(state=initialState, action){
	switch(action.type){
		case 'MARKETFEATURE':
			return {
				...state,marketfeature:action.payload
			}
		break;
	}
	return state
} 