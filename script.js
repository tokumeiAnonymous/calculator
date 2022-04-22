
const CreateCalculator = () => {
    let value = 0;
    let hasDecimal = false;
    let hasFirstOperator = false;

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
        hasDecimal = false;
        hasFirstOperator = false;
    }

    return Object.freeze({ value, add, minus, multiply, divide, clear});
}

const calculator = CreateCalculator();

calculator.add(1);
console.log(calculator.value);