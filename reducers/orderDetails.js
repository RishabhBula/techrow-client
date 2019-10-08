const initialState = {
	ordercount:"",
	billingcheck:false,
	sname:"",
	saddress:"",
	scity:"",
	sstate:"",
	szipcode:"",
	bname:"",
	baddress:"",
	bcity:"",
	bstate:"",
	bzipcode:"",
	cardholdername:"",
	postalcode:"",
	cardnumber:"",
	expmonth:"",
	expyear:"",
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