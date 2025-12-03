// Creating a function that uses a for loop to iterate through an array

function addAll(array) {
    let totalSum = 0;
     let partsNumbers = [];

    for (let i = 0; i < array.length; i++) {
        totalSum += array[i];

    }
    for (let i = totalSum; i > 0; i--) {
        partsNumbers.push(i);    
    }
    let totalNumers = partsNumbers.join('+');

    return `${totalNumers} = ${totalSum}`;
}
let array = [1, 1, 1, 1, 1];

console.log(addAll(array)); //  "5+4+3+2+1= 5"

