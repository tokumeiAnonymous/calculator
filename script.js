

const calculator = {
    displayValue: '',
    inputValue: '',
    waitForSecondOperand: false,
    operator: '',
    hasDecimal: false,
}

const display1 = document.querySelector('.display1');
const display2 = document.querySelector('.display2');

function chooseOperation(operation) {

    if (calculator.waitForSecondOperand == false){
        calculator.waitForSecondOperand = true;
        calculator.displayValue = calculator.inputValue;
        console.log(calculator.inputValue);
        calculator.inputValue = '';
        calculator.operator = operation;
        updateInput();
    } else { 
        updateDisplay();
    }
    calculator.operator = operation;
    updateInput();
}

function updateDisplay() {

    const num1 = parseFloat(calculator.displayValue);
    const num2 = parseFloat(calculator.inputValue);

    //if by any chance num1 becomes not a number due to del or clr
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
    display1.innerText = `${calculator.displayValue} ${calculator.operator}`;
    display2.innerText = `${calculator.inputValue}`;
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