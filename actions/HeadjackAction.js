var HeadjackAction={};
export default HeadjackAction;



HeadjackAction.appList = (result) =>{

	console.log("appList result",result)
	return ({
		type:"PROJECT",
		payload:result
	})


}

HeadjackAction.deviceStateList = (result) =>{

	console.log("deviceStateList",result)
	return ({
		type:"DALIAS",
		payload:result
	})

}

HeadjackAction.deviceAliasList = (result) =>{

	console.log("deviceAliasList",result)
	return ({
		type:"DSTATE",
		payload:result
	})

}


