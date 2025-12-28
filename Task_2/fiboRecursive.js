// Creating a function to generate Fibonacci sequence up to number using recursion

function fiboRecursive(n, prev = 0, curr = 1, sequence = [0, 1]) {

   let next = prev + curr;

   if(next > n ) {
  
    return sequence;
   }
   sequence.push(next);
  return fiboRecursive(n, curr, next, sequence);
}

let result = fiboRecursive(36);
console.log(result.join(','));


