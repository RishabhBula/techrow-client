export function setMarketsearchquery(query,limit){
  return({
    type:"MARKETSEARCHQUERY",
    query:query,
    limit:limit
  })
} 