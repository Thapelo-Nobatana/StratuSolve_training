// creating a function that uses forEach loop to iterate over an array

function addAll(array) {
    let totalSum = 0;
    let partsNumbers = [];

    array.forEach(num => totalSum += num);
    
    while (totalSum > 0) {
        partsNumbers.push(totalSum);
        totalSum--;
    }

    let totalNumers = partsNumbers.join('+');

    return `${totalNumers} = ${partsNumbers.length}`;
}

let array = [1, 1, 1, 1, 1];

console.log(addAll(array)); // "5+4+3+2+1 = 5"