// creating a function uses recursion to iterate over an array

function addAll(array) {
    if (array.length === 0) {
        return 0;
    }

    const currentSum = array.reduce((acc, val) => acc + val, 0);
 
     array.pop();
     return currentSum + addAll(array);
}
let array = [1, 1, 1, 1,1, 6]; 

console.log(addAll(array)); 
