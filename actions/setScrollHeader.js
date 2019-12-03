export function setScrollHeader(scroll){
	setTimeout(() =>{
  	var elmnt = document.getElementById(scroll);
  	if(elmnt)
  	elmnt.scrollIntoView({behavior: 'smooth'})
  },100)
  return({
    type:"SCROLLHEADER",
    scroll:scroll
  })
  
  
} 