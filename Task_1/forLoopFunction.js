// Creating a function that uses a for loop to iterate through an array

function addAll(array) {
    let totalSum = 0;
    
  
    for (let i = 0; i <= 6; i++ ) {
    
     
      const currentSum = array.reduce((acc, val) => acc + val, 0);
       totalSum += currentSum;
       
       array.pop();
    }



    return totalSum;
}

let array = [1, 1, 1, 1, 1, 6];


