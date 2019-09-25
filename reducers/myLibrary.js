const initialState = {
	mylibrary:[]
}
export default function(state=initialState, action){
	switch(action.type){
		case 'MYLIBRARY':
			return {
				...state,mylibrary:action.payload
			}
		break;
	}
	return state
} 