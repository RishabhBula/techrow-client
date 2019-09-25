const initialState = {
	type:"",
	firstname:"",
	lastname:"",
	email:"",
	username:"",
	countrycode:"+1",
	phonenumber:"",
	password:"",
	schoolname:"",
	address:"",
	city:"",
	state:"",
	zipcode:"",
	grade:"",
	schooldistrict:"",
	po:"",
	taxexid:"",
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