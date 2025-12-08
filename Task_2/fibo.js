// creating a Fibonacci function Using loops


const fibo = (n) => {
 if(n === 1) {
    return 1
 }
 if(n === 0) {
    return 0
 }

 let prevNum = 0
 let currNum = 1
 let sequence = []

 for ( let i = 2; i < n; i++){
    let nextNum = prevNum + currNum

    prevNum = currNum
    currNum = nextNum
    if (currNum === n) {
       break;
    }
    sequence.push(currNum)
 } 
     
 
 let stringNum = sequence.join(' + ');

    

 return `${stringNum} = ${n}`;
}


let result = fibo(55);

console.log(result);