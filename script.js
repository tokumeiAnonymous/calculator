

const calculator = {
    displayValue: '',
    inputValue: '',
    waitForSecondOperand: false,
    operator: '',
    hasDecimal: false,
}

function chooseOperation(operation) {

    calculator.operator = operation;

    if (calculator.waitForSecondOperand == false){
        calculator.waitForSecondOperand = true;
        calculator.displayValue = calculator.inputValue;
        calculator.inputValue = '';
    } else { 
        updateDisplay();
    }
}

function updateDisplay() {

    const num1 = parseFloat(calculator.displayValue);
    const num2 = parseFloat(calculator.inputValue);

    //if by any chance num1 becomes not a number
    if (isNaN(num1)) {
        clearDisplay();
        return;
    }

    //not allowing to compute if input is still empty
    if (isNaN(num2)) return;    

    calculator.inputValue = '';

    if (calculator.operator == '*'){
        calculator.displayValue = num1 * num2;
    } else if (calculator.operator == '/'){
        calculator.displayValue = num1 / num2;
    } else if (calculator.operator == '+'){
        calculator.displayValue = num1 + num2;
    } else if (calculator.operator == '-'){
        calculator.displayValue = num1 - num2;
    }

    const display = document.querySelector('.screen');
    const child = display.lastElementChild;

    if (child) {
        display.removeChild(child);
    }

    const content = document.createElement('div');
    content.classList.add('display');
    content.textContent = (`${calculator.displayValue}`);
    display.appendChild(content);

}

function appendInput(value) {

    if (value == '.') {
        if (calculator.hasDecimal == true) return;
        calculator.hasDecimal = true;
    }
    calculator.inputValue = calculator.inputValue + value;
    updateInput();

}

function updateInput() {
    const input = document.querySelector('.screen');
    const child = input.lastElementChild;

    if (child) {
        input.removeChild(child);
    }

    const content = document.createElement('div');
    content.classList.add('input');
    content.textContent = (`${calculator.inputValue}`);
    input.appendChild(content);
}

function clearDisplay() {
    calculator.displayValue = '';
    calculator.inputValue = '';
    calculator.waitForSecondOperand = false;
    calculator.operator = '';

    updateInput();

}

function deleteLast() {

    const len = calculator.inputValue.length;

    if (len <= 0) {
        calculator.displayValue = '';
        calculator.waitForSecondOperand = false;
    }

    calculator.inputValue = calculator.inputValue.substring(0, len - 1);
    updateInput();
}