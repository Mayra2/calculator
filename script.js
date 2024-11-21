const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumValue(num){
    //if current display is 0 replace it, else add num
    // const displayValue = calculatorDisplay.textContent;
    // calculatorDisplay.textContent = displayValue === '0' ? num : displayValue + num;

    //Replace current display if it has first value
    if (awaitingNextValue) {
        calculatorDisplay.textContent = num;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? num : displayValue + num;
    }
}

function addDecimal(){
    //If operator pressed don't add decimal
    if(awaitingNextValue) return;
    //If no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  
    '=': (firstNumber, secondNumber) => secondNumber,
  };
  

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    //Prevent multiple operators
    if (operatorValue && awaitingNextValue) return; 
    //Assign firstValue if no value
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //Ready for the next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

//Add event listeners for buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value)); 
    }else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());  //ctrl+D za selektovanje svih
    }
});

//Reset display
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click', resetAll);