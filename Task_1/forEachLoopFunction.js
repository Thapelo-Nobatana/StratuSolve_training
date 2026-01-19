// creating a function that uses forEach loop to iterate over an array


function addAll(array) {
    let totalSum = 0;

    while ( array.length > 0 ) {

    let acc = 0;
        array.forEach(element => {
            acc = acc + element;
        });
        array.pop();
    }

    return totalSum;
}
let array = [2, 1, 1, 1, 1,];

console.log(addAll(array)); 