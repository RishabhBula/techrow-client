const initialState = {
	ordercount:"",
	name:"",
	address:"",
	city:"",
	state:"",
	zipcode:"",
	cardholdername:"",
	postalcode:"",
	cardnumber:"",
	startdate:"",
	enddate:"",
	cvv:""
}
export default function(state=initialState, action){
	switch(action.type){
		case 'ORDERDETAILS':
			return {
				...state,...action.payload
			}
		break;
	}
	return state
} 