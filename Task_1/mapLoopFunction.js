// creating a function that uses map to iterate over an array

function addAll(array) {
  let totalSum = 0;
  let partsNumbers = [];

    array.map(num => {totalSum += num 
         partsNumbers.push(totalSum);  
    });
   
  let sumNumbers = partsNumbers.map((_, index) => totalSum - index).join('+');

    return `${sumNumbers} = ${totalSum}`
}
console.log(addAll([1, 1, 1, 1, 1])); // "5+4+3+2+1 = 5"