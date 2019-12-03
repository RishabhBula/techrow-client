const initialState = {
	scroll:""
}
export default function(state=initialState, action){
	switch(action.type){
		case 'SCROLLHEADER':
			return {
				...state,scroll:action.scroll
			}
		break;
	}
	return state
} 