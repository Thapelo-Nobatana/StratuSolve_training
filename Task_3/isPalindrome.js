function isPalindrome(str) {
   let clearedStr = str.trim().replace(/\s+/g, '').toLowerCase();
    let reversedStr = clearedStr.split('').reverse().join('');

    return clearedStr === reversedStr 
}


const result = isPalindrome("rac'car");
 console.log(result);





        //  let reversedStr = str.trim().replace(/\s+/g, '').toLowerCase().split('').reverse().join('');
