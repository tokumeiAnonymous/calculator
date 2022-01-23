
let prevValue = 0;
let currValue = 0;

function input(value){

    currValue = (currValue * 10) + value;

}

function calculate(operation){

    if (operation == "*") prevValue = prevValue * currValue;
    if (operation == "/") prevValue =  prevValue / currValue;
    if (operation == "+") prevValue = prevValue + currValue;
    if (operation == "-") prevValue = prevValue - currValue;

    console.log(prevValue + " " + currValue);

}