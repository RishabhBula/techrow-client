const initialState = {
	head:""
}
export default function(state=initialState, action){
	switch(action.type){
		case 'ACTIVEHEADER':
			return {
				...state,head:action.head
			}
		break;
	}
	return state
} 