// Model
const CreateCalculator = () => {
    const calculate = (num1, num2, operator) => {
        if (operator === '+') return add(num1, num2);
        else if (operator === '-') return minus(num1, num2);
        else if (operator === '*') return multiply(num1, num2);
        else if (operator === '/') return divide(num1, num2);
    }
    // the Math.round * n / n is a hack to round decimal places
    const add = (num1, num2) => Math.round((num1 + num2) * 10000) / 10000;
    const minus = (num1, num2) => Math.round((num1 - num2) * 10000) / 10000;
    const multiply = (num1, num2) => Math.round((num1 * num2) * 10000) / 10000;
    const divide = (num1, num2) => {
        if (num2 === 0) return undefined;
        return Math.round((num1 / num2) * 10000) / 10000;
    }
    return Object.freeze({calculate});
}

// Controllers
function analyzeInput(input) {
    if (input == '.') {
        if (inputHasDecimal == true) return;
        inputHasDecimal = true;
        updateCurrent(input);
    }
    else if (!isNaN(parseFloat(input))) updateCurrent(input);
    else if (input == 'del') updateCurrent(input);
    else if (input == 'clr') clearDisplay();
    else if (isNaN(parseFloat(input))) {
        const value = calculateInputs(input);
        updatePrevious(input, value);
    }
}

function calculateInputs(input) {
    if (current.innerText == '' && previous.innerText == '') return;
    let value;
    inputHasDecimal = false;

    if (hasPendingOperation) {
        if (input == '=') hasPendingOperation = false;
        if (current.innerText == '') {
            if (!isNaN(parseFloat(previous.innerText))) value = previous.innerText;
            else value = parseFloat(previous.innerText.slice(0, -1));
        }
        else {
            const operator = previous.innerText.slice(-1);
            const num2 = parseFloat(current.innerText);
            value = calculator.calculate(num1, num2, operator);
            num1 = value;
        }
    }
    else {
        hasPendingOperation = true;
        if (current.innerText == '') num1 = parseFloat(previous.innerText);
        else if (current.innerText != '') num1 = parseFloat(current.innerText);
        value = num1;
    }
    return value;
}

// Display
function updateCurrent(input) {
    if (current.innerText.length >= 16) return;
    else if (input == '0' && parseFloat(current.innerText) === 0 && current.innerText.length > 0) return;
    else if (input == 'del') {
        let charToDelete;
        if (current.innerText == '' ) {
            charToDelete = previous.innerText.slice(-1)
            previous.innerText = previous.innerText.slice(0, -1);
        }
        else {
            charToDelete = current.innerText.slice(-1)
            current.innerText = current.innerText.slice(0, -1);
        }
        if (charToDelete == '.') inputHasDecimal = false;
        else if (charToDelete == '*' || charToDelete == '/' || charToDelete == '+' || charToDelete == '-') {
            hasPendingOperation = false;
        }
    }
    // since zero is falsy needed to add ad hoc
    else if (parseFloat(input) || input == '0') current.innerText = current.innerText + input;
    else if (input == '.') {
        current.innerText = current.innerText + input;
        inputHasDecimal = true;
    }
}

function updatePrevious(operator, value) {
    if (value === undefined) return;
    if (operator == '=') previous.innerText = value;
    else previous.innerText = value + operator;
    current.innerText = '';
}

function clearDisplay() {
    current.innerText = '';
    previous.innerText = '';
    inputHasDecimal = false;
    hasPendingOperation = false;
    num1 = 0;
}

// Variables
const calculator = CreateCalculator();
let hasPendingOperation = false;
let inputHasDecimal = false;
let num1;
// let num2;

// DOM objects
const buttons = document.querySelector('.buttons');
const previous = document.querySelector('.top');
const current = document.querySelector('.bottom');

// Event Listeners
buttons.addEventListener('click', e => {
    if (e.target.className == 'buttons') return;
    analyzeInput(e.target.getAttribute('data-value'));
})

// Problems to fix
// not calculating
// if you first click the decimal the following number will overwrite it
