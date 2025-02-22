let selectedNumber = "";
let isOperationInProgress;
const resultDisplay = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const clearButton = document.querySelector(".clear-btn");
const operationButtons = document.querySelectorAll(".operation");
const equalButton = document.querySelector(".equal");
const plusMinusButton = document.querySelector(".plus-minus");
const pointButton = document.querySelector(".point");
let firstNumber, secondNumber, currentOperator, previousOperator;

resultDisplay.textContent = 0;

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const operate = function (a, b, operator) {
  if (operator === "+") {
    return add(a, b);
  }
  if (operator === "-") {
    return subtract(a, b);
  }
  if (operator === "x") {
    return multiply(a, b);
  }
  if (operator === "/") {
    return divide(a, b);
  }
};

const setResultToDisplayAndResetVariables = function (result) {
  setResultOnDisplay(result);

  firstNumber = result;
  secondNumber = null;
};

const clear = function () {
  selectedNumber = "";
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  previousOperator = null;
  setResultOnDisplay(0);
  removeClassActive();
};

const setResultOnDisplay = function (value) {
  resultDisplay.textContent = value;
};

const storeNumbersToVariables = function () {
  if (selectedNumber === "") return;

  if (firstNumber !== undefined && firstNumber !== null) {
    secondNumber = selectedNumber !== "" ? +selectedNumber : null;
  } else {
    firstNumber = +selectedNumber;
  }
  selectedNumber = "";
};

const populateTheDisplay = function (num) {
  if (resultDisplay.textContent.length > 23) {
    return;
  }
  selectedNumber += num;
  setResultOnDisplay(selectedNumber);
  if (currentOperator === "=") {
    firstNumber = null;
  }
};

const handleEqualButtonClick = function () {
  const result = operate(firstNumber, secondNumber, previousOperator);
  setResultToDisplayAndResetVariables(result);
};
function setClassActive(operator) {
  const buttonsList = [...operationButtons, equalButton];
  buttonsList.forEach((btn) => {
    if (btn.textContent === operator) {
      btn.classList.add("active");
    }
  });
}

function removeClassActive() {
  document.querySelectorAll(".active").forEach((btn) => {
    btn.classList.remove("active");
  });
}

const handleOperationButtonClick = function (operator) {
  removeClassActive();
  setClassActive(operator);
  storeNumbersToVariables();

  previousOperator = currentOperator;
  currentOperator = operator;

  if (firstNumber === undefined || firstNumber === null) return;

  if (previousOperator === null || previousOperator === undefined) {
    previousOperator = currentOperator;
  }

  if (
    firstNumber !== undefined &&
    secondNumber !== undefined &&
    secondNumber !== null
  ) {
    if (secondNumber === 0 && previousOperator === "/") {
      setResultOnDisplay(`LOL`);
      selectedNumber = "";
      firstNumber = null;
      secondNumber = null;
      currentOperator = null;
      previousOperator = null;
      return;
    }
    const result = operate(firstNumber, secondNumber, previousOperator);
    if (result !== undefined) {
      setResultToDisplayAndResetVariables(result);
    }
  }
};

function handlePointButtonClick() {
  if (selectedNumber.indexOf(".") === -1) {
    const point = pointButton.textContent;
    populateTheDisplay(point);
  }
}

function handlePluMinusButtonClick() {
  if (selectedNumber !== "") {
    selectedNumber = -1 * selectedNumber;
    setResultOnDisplay(selectedNumber);
  } else {
    firstNumber = -1 * firstNumber;
    setResultOnDisplay(firstNumber);
  }
}

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const num = event.target.textContent;
    populateTheDisplay(num);
  });
});

operationButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const operator = event.target.textContent;
    handleOperationButtonClick(operator);
  });
});

clearButton.addEventListener("click", clear);

equalButton.addEventListener("click", (e) => {
  const operator = event.target.textContent;
  handleOperationButtonClick(operator);
});

pointButton.addEventListener("click", handlePointButtonClick);

plusMinusButton.addEventListener("click", handlePluMinusButtonClick);

document.addEventListener("keydown", (e) => {
  const clickedKey = e.key;

  if (clickedKey >= 0 && clickedKey <= 9) {
    populateTheDisplay(clickedKey);
  }

  if (clickedKey === "+") {
    handleOperationButtonClick("+");
  } else if (clickedKey === "-") {
    handleOperationButtonClick("-");
  } else if (clickedKey === "*") {
    handleOperationButtonClick("x");
  } else if (clickedKey === "/") {
    handleOperationButtonClick("/");
  } else if (clickedKey === "Enter") {
    handleOperationButtonClick("=");
  }

  if (clickedKey === ".") {
    handlePointButtonClick();
  }
  if (clickedKey === "Backspace") {
    clear();
  }
});
