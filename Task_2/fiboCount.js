// create a function that returns the first n terms
const input = document.getElementById("inputNum");
const display = document.getElementById("display");






const fibo = (n) => {
   
    if(n > 94) {
      return "Enter a number between 0 to 94"
    }
    if( typeof n !== 'number' || n < 0)  {
        return "Enter a positive number"
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

   let properSequence = sequence
     properSequence.join(' , ');

   return properSequence
}



const resultInput = () => {
    const n = Number(input.value)
    let displaySequence = fibo(n)
  display.innerHTML = displaySequence;
}


// getting the documents 

