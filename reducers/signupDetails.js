const initialState = {
	type:"",
	firstname:"",
	lastname:"",
	email:"",
	username:"",
	phonenumber:"",
	password:"",
	schoolname:"",
	address:"",
	city:"",
	state:"",
	zipcode:"",
	grade:"",
}
export default function(state=initialState, action){
	switch(action.type){
		case 'SIGNUPDETAILS':
			return {
				...state,...action.payload
			}
		break;
	}
	return state
} 