// Model
const CreateCalculator = () => {
    let value = 0;
    let hasNoOperator = true;

    const hasNoFirstOperator = () => hasNoOperator;

    const setFirstInput = (input) => {
        value = input;
        hasNoOperator = false;
    }

    const calculate = () => Math.round(value * 10000) / 10000;

    const add = (input) => {
        value = value + input;
    }

    const minus = (input) => {
        value = value - input;
    }

    const multiply = (input) => {
        value = value * input;
    }

    const divide = (input) => {
        if (input == 0) return undefined;
        value = value / input;
    }

    const clear = () => {
        value = 0;
        hasNoOperator = true;
    }

    return Object.freeze({ calculate, add, minus, multiply, 
                          divide, clear, hasNoFirstOperator, setFirstInput });
}

// Controllers
function analyzeInput(input) {
    if (input == '.') {
        if (hasDecimal == true) return;
        hasDecimal = true;
        updateCurrent(input);
    }
    else if (parseFloat(input) || input == '0') updateCurrent(input);
    else if (input == 'del') updateCurrent(input);
    else if (input == 'clr') clearDisplay();
    else if (!parseFloat(input)) calculateInputs(input);
}

function calculateInputs(input) {
    if (calculator.hasNoFirstOperator()) {
        calculator.setFirstInput(parseFloat(current.innerText));
        if (input == '=') {
            previous.innerText = calculator.calculate();
            isAfterOperator = false;
        }
        else {
            previous.innerText = `${calculator.calculate()} ${input}`;
            isAfterOperator = true;
        }
    }
    else if (!isAfterOperator) {
        const operator = previous.innerText.slice(-1);
        isAfterOperator = true;
        if (operator == '*') calculator.multiply(parseFloat(current.innerText));
        else if (operator == '/') calculator.divide(parseFloat(current.innerText));
        else if (operator == '+') calculator.add(parseFloat(current.innerText));
        else if (operator == '-') calculator.minus(parseFloat(current.innerText));
        if (input == '=') {
            previous.innerText = calculator.calculate();
            current.innerText = calculator.calculate();
            return;
        }
        previous.innerText = `${calculator.calculate()} ${input}`;
        current.innerText = calculator.calculate();
    }
}

// Display
function updateCurrent(input) {
    if (isAfterOperator) {
        current.innerText = input;
        isAfterOperator = false;
    }
    else if (current.innerText.length >= 16) return;
    else if (input == 'del') {
        if (current.innerText.slice(-1) == '.') hasDecimal = false;
        current.innerText = current.innerText.slice(0, -1);
    }
    // since zero is falsy needed to add ad hoc
    else if (parseFloat(input) || input == '0') current.innerText = current.innerText + input;
    else if (input == '.') {
        current.innerText = current.innerText + input;
        hasDecimal = true;
    }
}

function clearDisplay() {
    current.innerText = '';
    previous.innerText = '';
    calculator.clear();
    hasDecimal = false;
}

// Variables
const calculator = CreateCalculator();
let hasDecimal = false;
let isAfterOperator = false;

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
