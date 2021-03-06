const initialState = {
	contactContent:[],
	createdDate:"",
	email:"",
	emailVerified:false,
	firstName:"",
	headJackCredentials:{},
	id:"",
	lastName:"",
	myOrders:[],
	myRecentViews:[],
	phoneNumber:"",
	organization:{},
	status:true,
	updatedDate:"",
	userType:"",
	username:""

}
export default function(state=initialState, action){
	switch(action.type){
		case 'USERDATA':
			return {
				...state,...action.payload
			}
		break;
	}
	return state
} 