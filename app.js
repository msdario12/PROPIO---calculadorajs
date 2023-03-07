// Get the containers for the numbers, operations and results
const numbersContainer = document.getElementById("numbers-container");
const operationsContainer = document.getElementById("operation-container");
const resultsContainer = document.getElementById("result-container");
// Create buttons for the numbers and add event listener to each one
for (const num of Array(10).keys()) {
  const newButton = document.createElement("button");
  newButton.textContent = num;
  numbersContainer.appendChild(newButton);
  newButton.onclick = (e) => {
    numberState.push(e.target.textContent);
    updateOperationOutput(e.target.textContent);
  };
}
// Create buttons for operations and assign the correct event-listener
const createButtonsOperations = (symbol) => {
  const newButton = document.createElement("button");
  newButton.textContent = symbol;
  operationsContainer.appendChild(newButton);
  switch (symbol) {
    case "(":
    case ")":
    case "sqr":
    case "+":
    case "-":
    case "*":
    case "^":
    case "/":
      newButton.onclick = () => genericOperation(symbol);
      break;
    case "=":
      newButton.onclick = () => resultOperation();
      break;
  }
};
// Call the function to create these operation buttons
const arrayOfSymbols = ['sqr','^','*','/','+','-','=','(',')']
arrayOfSymbols.forEach(sym => createButtonsOperations(sym))

// Create element to show the result value in the DOM
const resultOutput = document.createElement("input");
resultOutput.setAttribute("disabled", true);
resultsContainer.appendChild(resultOutput);
// Create element to show the operation stack in the DOM
const operationOutput = document.createElement("input");
operationOutput.setAttribute("disabled", true);
resultsContainer.appendChild(operationOutput);
// Functions to update the output results and stack of calculation
const updateOperationOutput = (val = "") => {
  val && operationVisualOutput.push(val);
  const output = operationVisualOutput.reduce((a, b) => a + b);
  operationOutput.setAttribute("value", output);
};
const updateResultOutput = () => {
  resultOutput.setAttribute("value", result);
};
// Create initial values for the state
let numberState = [];
let operationState = [1, "+", "(", 2, "*", "(", 2, "^", 3, ")", "+", 6, ")"];
let result = 0;
let resultState = [];
let operationVisualOutput = [
  1,
  "+",
  "(",
  2,
  "*",
  "(",
  2,
  "^",
  3,
  ")",
  "+",
  6,
  ")",
];
updateOperationOutput();
// Function to create a number from the numberState
const createNumberFromArray = () => {
  if (numberState.length === 0) {
    return;
  }
  const num = Number(numberState.reduce((a, b) => a + b));
  numberState = [];
  return num;
};
// Function to add numbers and operators symbols to the operationState, all the operators call to this function
const genericOperation = (symbol) => {
  updateOperationOutput(symbol);
  const number = createNumberFromArray();
  switch (symbol) {
    case "(":
      operationState = [...operationState, symbol];
      return;
  }
  if (!number) {
    operationState = [...operationState, symbol];
    return;
  }
  operationState = [...operationState, number, symbol];
  console.log(operationState, "operatioNState");
};
// Function to calculate the total of the operationState
const resultOperation = () => {
  const lastNumber = createNumberFromArray();
  //    if (!lastNumber) {
  //  return;
  //    }
  operationState = [...operationState, lastNumber];
  calculateTotalFromArray();
  result ? resultState.push(result) : (result = resultState[0]);
  operationState = [];
  operationVisualOutput = [];
  updateResultOutput();
  console.log("result state", resultState);
};

// Function to realize the aritmetic calc in function of the index, array and operator who is called
const calculateOperationFromIndex = (index, operator, array) => {
  let arrayResult;
  console.log(array, "antes-operation");
  const num1 = Number(array[index - 1]);
  const num2 = Number(array[index + 1]);
  console.log("num1", num1, "num2", num2);
  switch (operator) {
    case "sqr":
      arrayResult = num2 ** (1 / num1);
      break;
    case "^":
      arrayResult = num1 ** num2;
      break;
    case "*":
      arrayResult = num1 * num2;
      break;
    case "/":
      arrayResult = num1 / num2;
      break;
    case "+":
      arrayResult = num1 + num2;
      break;
    case "-":
      arrayResult = num1 - num2;
      break;
  }
  array[index + 1] = arrayResult;
  array.splice(index - 1, 2);
};
// Function to iterate around one array searching for one specific symbol operator, once no one of this symbol is in the array, continue for the next operator
const iterateOperationArray = (symbol, array) => {
  for (let index = 0; index < array.length; index++) {
    if (array[index] === symbol) {
      calculateOperationFromIndex(index, symbol, array);
      if (array.includes(symbol)) {
        index = 0;
      }
    }
  }
};
// [1, "+", "(", 2, "*", "(", 2, "^", 3, ")", "+", 6, ")"]
// Functions to call the iterations in function of the array and symbol, also manage the calc with parenthesis
const calculateBlock = (array) => {
  array[array.length] === ")" && array.pop();
  array[0] === "(" && array.shift();
  console.log(array, "dentro de arrayCalc");
  const arrayOfSymbolsOperators = ['sqr','^','*','/','+','-']
  arrayOfSymbolsOperators.forEach( sym => iterateOperationArray(sym, array))
  console.log(array[0], "RES-dentro de arrayCalc");
  return array[0];
};
let arraySlice = [];
// Function to find the parenthesis block in the operationState, push every block in to array and call a calculateBlock to get a result for every block
const findBlocksOfPhar = () => {
  while (operationState.includes("(")) {
    let newSlice = [];
    const initial = operationState.findLastIndex((e) => e === "(");
    const end = operationState.findIndex((e) => e === ")");
    // Creamos el slice entre parentesis
    newSlice = operationState.slice(initial, end + 1);
    // Agregamos ese slice al array de varios slices
    arraySlice.push(newSlice);
    const arrayLength = newSlice.length;
    console.log("array de slices", newSlice);
    // Calculamos ese slice
    let placeResult = calculateBlock(newSlice);
    // Agregamos el resultado del calculo del bloque al array de calculo general para ser calculado posteriormente sin parentesis
    operationState.splice(initial, arrayLength, placeResult);
    console.log("operation after delete", operationState);
  }
};

const calculateTotalFromArray = () => {
  if (operationState.length === 0) {
    return;
  }
  findBlocksOfPhar();
  calculateBlock(operationState);

  result = operationState[0];
  console.log("result", result);
};
