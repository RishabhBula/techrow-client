export function setClassMode(route,id,mode){
	return({
		type:"SETCLASSMODE",
		route:route,
		id:id,
		mode:mode
	})
} 