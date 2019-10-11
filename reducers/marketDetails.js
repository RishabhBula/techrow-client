const initialState = {
	category:"",
	createdDate:"",
	description:"",
	director:"",
	duration:0,
	featured:false,
	headjackProjectId:"",
	id:"",
	name:"",
	previewUrl:"",
	price:"",
	producers:[],
	searchQuery:"",
	status:"",
	studioName:"",
	thumbnail:"../images/logo-grey.png",
	updatedBy:"",
	updatedDate:""

}
export default function(state=initialState, action){
	switch(action.type){
		case 'MARKETDETAILS':
			return {
				...state,...action.payload
			}
		break;
	}
	return state
} 