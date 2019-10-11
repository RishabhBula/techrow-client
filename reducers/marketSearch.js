const initialState = {
	marketsearch:[]
}
export default function(state=initialState, action){
	switch(action.type){
		case 'MARKETSEARCH':
			return {
				...state,marketsearch:action.payload
			}
		break;
	}
	return state
} 