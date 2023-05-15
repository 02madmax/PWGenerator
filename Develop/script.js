//Selected DOM elements using getElementbyId
const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');

//Object that stores all of my variables
const charGen = {
  lower: getLowerCase,
  upper: getUpperCase,
  number: getNumber,
  symbol: getSymbol,
};

//Generate button event listener, listens for a click runs a generate password with checked/unchecked values
generateEl.addEventListener('click', () => {
  //+ sign in the length turns it into a number instead of string value
  const length = +lengthEl.value;
  //.checked value evalutes to true or false
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  //appends generated password here also = final result
  passwordEl.innerText = generatePassword(
    hasLower, 
    hasUpper, 
    hasNumber, 
    hasSymbol, 
    length
    );  

})

//Password generator function
function generatePassword(lower, upper, number, symbol, length) {
  
  //initializes password variable
  let generatedPassword = '';

  //counts the number of checked values
  const typesCount = lower + upper + number + symbol;

  //stores the values of selected elements in array and loops through and filters false values
  const typesArr = [{ lower },{ upper },{ number },{ symbol }].filter
  (item => Object.values(item)[0]);

  //if nothing is checked, no password will be generated. returns nothing
  if (typesCount === 0) {
    return '';
  } 
  //loops variable and loops type
  for (let i = 0; i < length; i += typesCount) {
    //passes type through object keys and generates password based on length selected
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      
      generatedPassword += charGen[funcName](); 
    })
  }
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}
//generates random lowercase character from charCode, + 97 to start at lower case a
function getLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
//generates random uppercase character from charCode +65 to start with uppercase A
function getUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
// random number generator using charCode
function getNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
// uses math at random with the provded symbols
function getSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)];
}


