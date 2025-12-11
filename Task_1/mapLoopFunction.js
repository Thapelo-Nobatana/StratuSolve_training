// creating a function that uses map to iterate over an array

function addAll(array) {
  let totalSum = 0;
  
  array.map(() => {
    const currentSum = array.reduce((acc, val) => acc + val, 0);
    totalSum += currentSum;
   
    array.pop();
  })
   


    return totalSum
}
console.log(addAll([1, 1, 1, 1, 1, 6])); 

