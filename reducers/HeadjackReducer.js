const initialState = {
	projects:{},
	dalias:{},
	dstate:{}
}
export default function(state=initialState, action){
	switch(action.type){
		case 'PROJECT':
			return {
				...state,projects:action.payload
			}
			break;
		case 'DALIAS':
			return {
				...state,dalias:action.payload
			}
			break;
		case 'DSTATE':
			return {
				...state,dstate:action.payload
			}
		    break;
	}
	return state
} 