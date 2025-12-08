// Creating a function to generate Fibonacci sequence up to number using recursion

// const fibo = (n) => {

//     if(n === 1) {
//          return 1
//     }
//     if(n === 0) {
//          return 0
//     }

//     return fibo(n - 1) + fibo(n - 2);

// }

// let result = fibo(7);

// console.log(result);



// let prev = 0;
// let next;
// let curr = 1;
// let n = 16;
// let arr = [];
// function fib ( n, prev, curr ) {
    
//     if (n === 0) return;
//      next = prev + curr
//       prev = curr
//       curr = next
//         arr.push(curr);
//      let sequence = arr.join('+');
//     console.log(sequence, `= ${n}`);

//     fib(n-1, prev, curr);
// }

// fib(n, prev, curr);

// let prev = 0;
// let curr = 1;
// let n = 34;
// let arr = [];  

// function fib(n, prev, curr) {
//   if (n === 0) {

//     let sequence = arr.join(" + ");
//     let total = arr.reduce((sum, num) => sum + num, 0);
//     console.log(sequence + " = " + total);
//     return;
//   }

  
//   let next = prev + curr;

//   arr.push(next);

  
//   fib(n - 1, curr, next);
// }

// fib(n, prev, curr);

function fiboRecursive(n, prev = 0, curr = 1, sequence = []) {
 
  if (n === 0){
    return 0
  };
  if (n === 1) {
    return 1
  };

  let next = prev + curr;

 
  if (next > n) {
    
    let stringNum = sequence.join(" + ");
    return `${stringNum} = ${n}`;
  }

 
  sequence.push(next);


  if (next === n) {
    let stringNum = sequence.join(" + ");
    return `${stringNum} = ${n}`;
  }

  
  return fiboRecursive(n, curr, next, sequence);
}



let result = fiboRecursive(34);
console.log(result);