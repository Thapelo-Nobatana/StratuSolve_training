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




// let n = 16;
function fib ( n) {
    if (n === 0) return;
    let prev = 0;
let next;
let curr = 1;
     next = prev + curr
      prev = curr
      curr = next
    console.log(curr + " ");

    fib(n-1);
}

fib(16, );

