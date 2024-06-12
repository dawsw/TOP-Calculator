let numberArray = [0];



function operate (operator, a, b) {
    return operator(a, b);
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

function displayNumber() {
    let buttons = document.getElementsByName("number");
    let displayNumbers = document.querySelector("#display-numbers");
    
    for (let button of buttons) {
        button.addEventListener("click", () => {
            displayNumbers.textContent += button.textContent;
            numberArray.push(Number(button.textContent))
        });

        button.addEventListener("mousedown", function () {
            button.style.backgroundColor = "rgb(77, 77, 77)";
        });

        button.addEventListener("mouseup", function () {
            button.style.backgroundColor = "rgb(59, 59, 59)";
        });
    }
}

function clearDisplayNumbers() {
    let button = document.getElementById("clearbutton");
    let displayNumbers = document.querySelector("#display-numbers");

    button.addEventListener("click", () => {
        displayNumbers.textContent = "0";  
    });
}

clearDisplayNumbers();
displayNumber();
