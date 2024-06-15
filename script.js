let firstNumber = "";
let selectedOperator = "";
let secondNumber = "";

let display= document.querySelector("#display-numbers");

const multiplyButton = document.querySelector("#multiplybutton");
const divideButton = document.querySelector("#dividebutton");
const addButton = document.querySelector("#addbutton");
const subtractButton = document.querySelector("#subtractbutton");
const equalButton = document.querySelector("#equalbutton");
const percentButton = document.querySelector("#percentbutton");
const plusMinusButton = document.querySelector("#plusminusbutton");

const operatorButtons = [multiplyButton, divideButton, addButton, subtractButton]
const specialButtons = [percentButton, plusMinusButton]


display.textContent = 0;

//get current display numbers
function getDisplayNumber() {
    return Number(document.querySelector("#display-numbers").textContent);
}

//change operator color back to orange after number button pressed
function revertAllOperatorColor(buttonlist) {
    for (let button of buttonlist) {
        button.style.backgroundColor = "rgb(155, 103, 6)";
        button.style.color = "white";
    }
}

function checkOperatorColor(buttonlist) {
    for (let button of buttonlist) {
        if (button.style.backgroundColor == "white") {
            return true;
        }
    }
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    if (operator == "+") {
        return add(a, b);
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

function percentage(a) {
    return a / 100;
}


// for operator button press
// getDisplayNumber, set firstNumber if firstNumber = null, set selectedOperator
// else if firstNumber != null and secondNumber = null, set secondNumber, operate, display result, set firstNumber = result

//operator buttons
for (let button of operatorButtons) {
    button.addEventListener("click", () => {
        //if no first number, set it to 0 & set selectedOperator
        if (firstNumber == "") {
            firstNumber = 0;
            selectedOperator = button.textContent;
        }
      
        else if ((firstNumber != "" && secondNumber == "") || selectedOperator != "") {
            selectedOperator = button.textContent;
            secondNumber = "";
        }
        else if (firstNumber != "" && secondNumber != "") {
            display.textContent = operate(selectedOperator, firstNumber, secondNumber);
            firstNumber = operate(selectedOperator, firstNumber, secondNumber);
            selectedOperator = button.textContent;
        }

        //if there is already a white button, change it back to orange if another is pressed
        for (let button of operatorButtons) {
            if (button.style.backgroundColor == "white") {
                button.style.backgroundColor = "rgb(155, 103, 6)";
                button.style.color = "white";
            }
        }

        console.log(firstNumber, selectedOperator. secondNumber)
        //for operator color change
        button.style.color = "orange";
        button.style.backgroundColor = "white";
    })
}


//number buttons
let numberButtons = document.getElementsByName("number");
    
for (let button of numberButtons) {
    button.addEventListener("click", () => {
    
    //return if there is already a decimal
    if (button.id == "decimalbutton") {
        if (display.textContent.includes(".")) {
            return;
        }
    }
    
    //clear textContent if operator is clicked
    if (checkOperatorColor(operatorButtons) ) {
        display.textContent = "";
    }

    //remove 0 if first button clicked is a number
    if (display.textContent == "0" && button.textContent != ".") {
        display.textContent = "";
    }
    else if (display.textContent == "-0" && button.textContent != ".") {
        display.textContent = "-";
    }

    //add button text value to first number if no selectedOperator
    if (selectedOperator == "") {
        display.textContent += button.textContent;
        firstNumber += button.textContent;
    }
    //else reset display and add button text value to secondNumber
    else {
        display.textContent == "";
        display.textContent += button.textContent;
        secondNumber += button.textContent;
    }

    revertAllOperatorColor(operatorButtons);
    });

    button.addEventListener("mousedown", function () {
        button.style.backgroundColor = "rgb(77, 77, 77)";
    });

    button.addEventListener("mouseup", function () {
        button.style.backgroundColor = "rgb(59, 59, 59)";
    });
}

//equal button
equalButton.addEventListener("click", () => {
    if (firstNumber == "") return;
    else if (firstNumber != "" && selectedOperator != "" && secondNumber == "") {
        revertAllOperatorColor(operatorButtons);
        secondNumber = firstNumber;
        display.textContent = operate(selectedOperator, firstNumber, secondNumber);
        firstNumber = operate(selectedOperator, firstNumber, secondNumber);
    }
    else if (firstNumber != "" && selectedOperator != "" && secondNumber != "") {
        display.textContent = operate(selectedOperator, firstNumber, secondNumber);
        firstNumber = operate(selectedOperator, firstNumber, secondNumber);
    }

    console.log(firstNumber, selectedOperator, secondNumber)
})

equalButton.addEventListener("mousedown", () => {
    equalButton.style.color = "orange";
    equalButton.style.backgroundColor = "white";
})

equalButton.addEventListener("mouseup", () => {
    equalButton.style.backgroundColor = "rgb(155, 103, 6)";
    equalButton.style.color = "white";
})

//clear button
let clearButton = document.querySelector("#clearbutton");

clearButton.addEventListener("click", () => {
    firstNumber = "";
    secondNumber = "";
    selectedOperator = "";
    display.textContent = 0;
    revertAllOperatorColor(operatorButtons);  
})

clearButton.addEventListener("mousedown", function () {
    clearButton.style.backgroundColor = "rgb(161, 161, 161)";
})

clearButton.addEventListener("mouseup", function () {
    clearButton.style.backgroundColor = "rgb(134, 134, 134)";
})


//special buttons
for (let button of specialButtons) {
    button.addEventListener("click", () => {
        let displayNumbers = document.querySelector("#display-numbers").textContent;

        //plusminus button
        if (button.id == "plusminusbutton" && display.textContent.includes("-")) {
            display.textContent = display.textContent.replace("-", "");
            if (secondNumber == "") firstNumber = display.textContent;
            else secondNumber = display.textContent;
        }
        else {
            if (button.id == "plusminusbutton" && secondNumber == ""){
                display.textContent = `-${display.textContent}`
                firstNumber = display.textContent;
            }
            else if (button.id == "plusminusbutton" && firstNumber != ""){
                display.textContent = `-${display.textContent}`
                secondNumber = display.textContent;
            }
        }

        //percent button
        if (button.id == "percentbutton" && secondNumber == "") {
            display.textContent = percentage(Number(display.textContent))
            firstNumber = display.textContent;
        }
        else if (button.id == "percentbutton" && firstNumber != ""){
            display.textContent = percentage(Number(display.textContent))
            secondNumber = display.textContent;
        }
        
    });
    

    button.addEventListener("mousedown", function () {
        button.style.backgroundColor = "rgb(161, 161, 161)";
    });

    button.addEventListener("mouseup", function () {
        button.style.backgroundColor = "rgb(134, 134, 134)";
    });
}


