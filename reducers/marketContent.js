const initialState = {
	marketcontent:[]
}
export default function(state=initialState, action){
	switch(action.type){
		case 'MARKETCONTENT':
			return {
				...state,marketcontent:action.payload
			}
		break;
	}
	return state
} 