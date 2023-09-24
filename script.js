const calcHeader = document.querySelector(".calc-header");
const calcHeaderResult = document.querySelector(".calc-header-result");
const clearAll = document.querySelector(".calc-btn-c");
const deleteRight = document.querySelector(".calc-btn-del");
const bracket = document.querySelector(".calc-btn-bracket");
const operations = document.querySelectorAll(".calc-btn-op");
const numbers = document.querySelectorAll(".calc-btn-num");
const equals = document.querySelector(".calc-btn-equal");
const plusMinus = document.querySelector(".calc-btn-plus-minus");

// operators in calculator
const opElm = ["%", "/", "*", "-", "+"];

// class Calculator
class Calculator {
  constructor(strToCalc, strToDisplay) {
    this.strToCalc = strToCalc;
    this.strToDisplay = strToDisplay;
    this.lastOperator = "";

    this.initialState();
  }

  // initial state
  // clear all
  initialState = () => {
    this.strToCalc = "";
    this.strToDisplay = "";
    this.lastOperator = "";

    this.updateDisplay();
  };

  // delete one char right
  deleteOneCharRight = () => {
    if (!this.strToCalc) return;
    this.strToCalc = this.strToCalc.slice(0, -1);
    this.updateDisplay();
  };

  // append numbers
  appendNumbers = (num) => {
    // check for decimal
    const indexOfLastOp = this.strToCalc.lastIndexOf(this.lastOperator);
    const lastNumSet = this.strToCalc.slice(indexOfLastOp);
    if (
      num === "." &&
      (lastNumSet.includes(".") ||
        (!this.lastOperator && this.strToCalc.includes(".")))
    ) {
      return;
    }

    this.strToCalc += num;
    this.updateDisplay();
  };

  // append operators
  appendOperators = (op) => {
    if (!this.strToCalc) return;

    // check last charater of the string to calculate
    this.checkLastChar();

    // store the last operator
    this.lastOperator = op;

    // append the last operator to the current string to calculate
    this.strToCalc += this.lastOperator;
    this.updateDisplay();
  };

  // append plus-minus
  appendPlusMinus = () => {
    if (!this.strToCalc) {
      this.strToCalc += "(-";
    } else if (this.strToCalc === "(-") {
      this.strToCalc = "";
    } else {
      this.strToCalc += "*(-";
    }

    this.updateDisplay();
  };

  // append bracket
  appendBracket = () => {
    const str = this.strToCalc;

    // opening parenthesis count (opc)
    const opc = (this.strToCalc.match(/\(/g) || []).length;
    // closing parenthesis count (cpc)
    const cpc = (this.strToCalc.match(/\)/g) || []).length;

    if (
      opElm.includes(str[str.length - 1]) ||
      str.indexOf("(") === -1 ||
      (str.lastIndexOf("(") < str.lastIndexOf(")") && opc <= cpc)
    ) {
      this.strToCalc +=
        str[str.length - 1] === ")" || Number.isInteger(+str[str.length - 1])
          ? "*("
          : "(";
    } else if (
      opc > cpc ||
      (str.indexOf("(") !== -1 && str.indexOf(")") === -1) ||
      str.lastIndexOf("(") > str.lastIndexOf(")")
    ) {
      this.strToCalc += ")";
    }

    this.updateDisplay();
  };

  // calculations
  calculateTotal = () => {
    if (!this.strToCalc) return;

    // check last charater of the string to calculate
    this.checkLastChar();

    const ttl = eval(this.strToCalc);
    this.strToDisplay = ttl.toString();
    this.updateDisplay();

    // start again from the previous result
    this.strToCalc = this.strToDisplay;
    this.strToDisplay = "";
  };

  // check last character of the string to calculate
  checkLastChar = () => {
    // last character of the string to calculate
    const lastChar = this.strToCalc[this.strToCalc.length - 1];

    // check if the last character of the string to calculate is any of the operators
    // if yes, remove the last operator from the string
    if (opElm.includes(lastChar)) {
      this.strToCalc = this.strToCalc.slice(0, -1);
    }
  };

  // update display
  updateDisplay = () => {
    calcHeader.textContent = this.strToCalc;
    calcHeaderResult.textContent = this.strToDisplay;
  };
}

// Calculator object
const calculator = new Calculator(
  calcHeader.textContent,
  calcHeaderResult.textContent
);

// iterate through numbers
numbers.forEach((elm) => {
  elm.addEventListener("click", () => {
    // append numbers
    calculator.appendNumbers(elm.value);
  });
});

// iterate through operators
operations.forEach((elm) => {
  elm.addEventListener("click", () => {
    // append operators
    calculator.appendOperators(elm.value);
  });
});

// plus-minus (+/-) btn
plusMinus.addEventListener("click", () => {
  console.log(plusMinus.value);
  // append +/-
  calculator.appendPlusMinus();
});

// bracket btn
bracket.addEventListener("click", () => {
  // append bracket
  calculator.appendBracket();
});

// clear all btn
clearAll.addEventListener("click", () => {
  // clear to initial state
  calculator.initialState();
});

// delete one character right
deleteRight.addEventListener("click", () => {
  // perform delete
  calculator.deleteOneCharRight();
});

// equals to btn
equals.addEventListener("click", () => {
  // perform calculations
  calculator.calculateTotal();
});
