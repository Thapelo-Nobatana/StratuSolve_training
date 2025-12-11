// creating a Fibonacci function Using loops


const fibo = (n) => {

 if(n === 0) {
    return 0
 }
 let prevNum = 0;
 let currNum = 1;
 let sequence = [0,1,];
   while ( currNum < n) {

      let nextNum = prevNum + currNum
      prevNum = currNum
      currNum = nextNum
   if (n => currNum) {
      sequence.push(nextNum) 
     } 
   }
    
 return sequence;
}
let result = fibo(34);

console.log(result.join(', '));
