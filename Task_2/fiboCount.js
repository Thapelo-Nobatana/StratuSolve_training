// create a function that returns the first n terms


const fibo = (n) => {
   
    
    if( typeof n !== 'number' || n < 0)  {
        return "we need a positive number"
    }
    if(n === 0) return [];
   if(n === 1 ) return [0];
  
     let sequence = [0, 1]
   if(n === 2) {
    return sequence
   }

   for(let i = 2; i < n; i++ ) {

    let fiboNum = sequence[sequence.length - 1] + sequence[sequence.length - 2]
    sequence.push(fiboNum);
   }
   return sequence
}

console.log(fibo(true));