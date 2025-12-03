// creating a function uses recursion to iterate over an array

function addAll(array, index = 0, totalSum = 0) {
    if (index === array.length) {
        let partsNumbers = [];
        for (let i = totalSum; i > 0; i--) {
            partsNumbers.push(i);
        }
        let totalNumers = partsNumbers.join('+');
        return `${totalNumers} = ${totalSum}`;
    }
    return addAll(array, index + 1, totalSum + array[index]);
}

let array = [1, 1, 1, 1, 1];

console.log(addAll(array)); // "5+4+3+2+1 = 5"