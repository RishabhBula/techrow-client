const initialState = {
	route:"",
	id:"",
	mode:"theater"
}
export default function(state=initialState, action){
	switch(action.type){
		case 'SETCLASSMODE':
			return {
				...state,route:action.route,id:action.id,mode:action.mode
			}
		break;
	}
	return state
} 