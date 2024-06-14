let firstNumber = null;
let selectedOperator = null;
let secondNumber = null;

let displayNumbers = document.querySelector("#display-numbers");

const multiplyButton = document.querySelector("#multiplybutton");
const divideButton = document.querySelector("#dividebutton");
const addButton = document.querySelector("#addbutton");
const subtractButton = document.querySelector("#subtractbutton");
const equalButton = document.querySelector("#equalbutton");
const percentButton = document.querySelector("#percentbutton");
const plusMinusButton = document.querySelector("#plusminusbutton");

const operatorButtons = [multiplyButton, divideButton, addButton, subtractButton]
const specialButtons = [percentButton, plusMinusButton]


displayNumbers.textContent = 0;

//get current display numbers
function getDisplayNumber() {
    return Number(document.querySelector("#display-numbers").textContent);
}

// for operator button press
// getDisplayNumber, set firstNumber if firstNumber = null, set selectedOperator
// else if firstNumber != null and secondNumber = null, set secondNumber, operate, display result, set firstNumber = result


for (let button of operatorButtons) {
    button.addEventListener("click", () => {
        let display = getDisplayNumber();

        if (firstNumber == null) {
            firstNumber = display;
            selectedOperator = button.textContent;
        }
        else if (firstNumber != null && secondNumber == null) {
            secondNumber = display;
            firstNumber = operate(selectedOperator, firstNumber, secondNumber)
            displayNumbers.textContent = firstNumber;
            secondNumber = null;
            selectedOperator = button.textContent;

        }

        for (let button of operatorButtons) {
            if (button.style.backgroundColor == "white") {
                button.style.backgroundColor = "rgb(155, 103, 6)";
                button.style.color = "white";
            }
        }
        
        button.style.color = "orange";
        button.style.backgroundColor = "white";
    });
}



let buttons = document.getElementsByName("number");
    
for (let button of buttons) {
    button.addEventListener("click", () => {

    let display = document.querySelector("#display-numbers");

    if (checkOperatorColor(operatorButtons) ) {
        display.textContent = "";
    }
    //remove 0 if first button clicked is a number
    if (display.textContent == "0" && button.textContent != ".") {
        display.textContent = "";
    }

    display.textContent += button.textContent;

    revertAllOperatorColor(operatorButtons);
    });

    button.addEventListener("mousedown", function () {
        button.style.backgroundColor = "rgb(77, 77, 77)";
    });

    button.addEventListener("mouseup", function () {
        button.style.backgroundColor = "rgb(59, 59, 59)";
    });
}


function checkOperatorColor(buttonlist) {
    for (let button of buttonlist) {
        if (button.style.backgroundColor == "white") {
            return true;
        }
    }
}








































function operate(operator, a, b) {
    if (operator == "+") {
        return add (a, b);
    }
    else if(operator == "-") {
        return subtract(a, b);
    }
    else if(operator == "x") {
        return multiply(a, b);
    }
    else if(operator == "÷") {
        if (firstNumber == 0 || secondNumber == 0) {
            return "nonono";
        }
        else {
            return divide(a, b);
        }
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}



    



//clear button
function clearDisplayNumbers() {
    let button = document.getElementById("clearbutton");

    button.addEventListener("click", () => {
        firstNumber = null;
        secondNumber = null;
        selectedOperator = null;
        displayNumbers.textContent = "0";
        revertAllOperatorColor(operatorButtons);  
    });

}

//change operator color back to orange after number button pressed
function revertAllOperatorColor(buttonlist) {
    for (let button of buttonlist) {
        button.style.backgroundColor = "rgb(155, 103, 6)";
        button.style.color = "white";
    }
}

clearDisplayNumbers();

