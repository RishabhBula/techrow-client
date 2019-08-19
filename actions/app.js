 
export function startRequest(apiName,err="") {
  return {
    type: REQUEST_START,
    payload:{loading:true,api:apiName,err:err}
  }
}

 
export function endRequest(apiName,err="") {
  return {
    type: REQUEST_END,
    payload:{loading:false,api:apiName,err:err}
  }
}

export function endRequestError(epiName,err) {
  return {
    type: REQUEST_ERROR,
    payload:{loading:false,api:apiName,err:err}
  }
}