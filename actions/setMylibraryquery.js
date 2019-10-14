export function setMylibraryquery(query,limit){
  return({
    type:"MYLIBRARYQUERY",
    query:query,
    limit:limit
  })
} 