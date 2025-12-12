// create a function 

const gear = {
	"Baseball Bat": "Andy",
	"Padel raquet": "Andy",
	"Golf club": "Bob",
	"Cricket Bat": "Andy",
	"Hockey stick": "Candice",
};


function groupByOwner(head) {

	//new Object
	let newGear = {}
    
	
     for( const key in head){
        	 const value = head[key]
          
       
	
		 if(newGear.hasOwnProperty(value)) {

			newGear[value].push(key)
		 } else if(!newGear.hasOwnProperty(value)) {
			 
			newGear[value] = [key]
		 }
		 
	    }
	
  return newGear
}
 const result = groupByOwner(gear);

console.log(result);


