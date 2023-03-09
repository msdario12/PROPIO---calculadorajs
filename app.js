// Get the containers for the numbers, operations and results
const numbersContainer = document.getElementById("numbers-container");
const operationsContainer = document.getElementById("operation-container");
const resultsContainer = document.getElementById("result-container");
// Function to append class names to an element
const assignClassesToElement = (element, ...classes) => {
  classes.forEach( cls => element.classList.add(cls))
}
// Create buttons for the numbers and add event listener to each one
for (const num of Array(11).keys()) {
  const newButton = document.createElement("button");
  newButton.textContent = num;
  // Positioning every number in a grid distribution
  switch (num) {
    case 9:
      numbersContainer.children[0].children[2].appendChild(newButton);
      break;
    case 8:
      numbersContainer.children[0].children[1].appendChild(newButton);
      break;
    case 7:
      numbersContainer.children[0].children[0].appendChild(newButton);
      break;
    case 6:
      numbersContainer.children[1].children[2].appendChild(newButton);
      break;
    case 5:
      numbersContainer.children[1].children[1].appendChild(newButton);
      break;
    case 4:
      numbersContainer.children[1].children[0].appendChild(newButton);
      break;
    case 3:
      numbersContainer.children[2].children[2].appendChild(newButton);
      break;
    case 2:
      numbersContainer.children[2].children[1].appendChild(newButton);
      break;
    case 1:
      numbersContainer.children[2].children[0].appendChild(newButton);
      break;
    case 0:
      numbersContainer.children[3].children[0].appendChild(newButton);
      break;
    case 10:
      newButton.textContent = '.'
      numbersContainer.children[3].children[1].appendChild(newButton);
      break;

    default:
      break;
  }
  // numbersContainer.appendChild(newButton);
  // Added classes to every button number
  assignClassesToElement(newButton, "btn", "btn-primary", "my-1", "w-100")
  // Add event listener's to every button
  newButton.onclick = (e) => {
    numberState.push(e.target.textContent);
    updateOperationOutput(e.target.textContent);
    stateEqualPress = false;
  };
}
// Create buttons for operations and assign the correct event-listener
const createButtonsOperations = (symbol) => {
  const newButton = document.createElement("button");
  // Added classes to every button number
  assignClassesToElement(newButton, "btn", "btn-secondary", "my-1", "w-100")
  newButton.textContent = symbol;
  switch (symbol) {
    case '=':
      numbersContainer.children[3].children[2].appendChild(newButton);
      break;
    case '/':
      numbersContainer.children[0].children[3].appendChild(newButton);
      break;
    case '*':
      numbersContainer.children[1].children[3].appendChild(newButton);
      break;
    case '-':
      numbersContainer.children[2].children[3].appendChild(newButton);
      break;
    case '+':
      numbersContainer.children[3].children[3].appendChild(newButton);
      break;
  }
  // operationsContainer.appendChild(newButton);
  // Asign function to every symbol operation
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
    case "ans":
      newButton.onclick = () => ansCallMemory();
      break;
  }
};
// Function to call a last result in memory
const ansCallMemory = () => {
  const ansValue = resultState[resultState.length - 1];
  operationState.push(ansValue);
  updateOperationOutput('Ans');
  console.log(operationState, "Ans");
};

// Call the function to create these operation buttons
const arrayOfSymbols = ["sqr", "^", "*", "/", "+", "-", "=", "(", ")", "ans"];
arrayOfSymbols.forEach((sym) => createButtonsOperations(sym));

// Create element to show the operation stack in the DOM
const operationOutput = document.createElement("input");
operationOutput.setAttribute("readonly", true);
// operationOutput.classList.add("form-control-plaintext")
assignClassesToElement(operationOutput, "text-end", "form-control-md", "form-control-plaintext")
operationsContainer.appendChild(operationOutput);

// Create element to show the result value in the DOM
const resultOutput = document.createElement("input");
resultOutput.setAttribute("readonly", true);
assignClassesToElement(resultOutput, "text-end", "form-control-lg", "form-control-plaintext")
resultsContainer.appendChild(resultOutput);

// Functions to update the output results and stack of calculation
const updateOperationOutput = (val = "") => {
  val && operationVisualOutput.push(val);
  let output = "";
  if (operationVisualOutput.length > 0) {
    output = operationVisualOutput.reduce((a, b) => a + b);
  } else {
    output = operationVisualOutput;
  }
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
let stateEqualPress = false
let stateOperationOn = false
let pushAnsAsNumber = false

// START MUTATION OBSERVER
const configMutation = {attributes: true, childList: true, subtree: true }
const callback = () => {

  console.log('resultState', resultState)
  console.log('As change is made')
  // if (stateOperationOn===true 
  //   && numberState.length === 0 
  //   && stateEqualPress === true) {
  //   console.log('Se hizo operacion sin numero antes')
  //   pushAnsAsNumber = true
  // }
   if (numberState.length === 0 && stateEqualPress === true) {
     console.log('clear operationState')
     operationState = [];
     operationVisualOutput = [];
    //  stateEqualPress = false
   }

}
const observer = new MutationObserver(callback)
observer.observe(operationOutput, configMutation)

// END MUTATION OBSERVER


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
  // stateOperationOn = true
  
  const number = createNumberFromArray();
  
  switch (symbol) {
    case "(":
      operationState = [...operationState, symbol];
      return;
  }
  if (!number && stateEqualPress) {
    // const lastResult = resultState.slice(-1)[0]
    // operationVisualOutput.push('Ans')
    // operationState = [...operationState, lastResult]
    ansCallMemory()
    pushAnsAsNumber = false
    stateOperationOn = false
    console.log(operationState, "operatioNState");
    stateEqualPress = false
  }
  updateOperationOutput(symbol);
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
  if (!lastNumber && lastNumber !== 0) {
    result = "Error";
    updateResultOutput();
    updateOperationOutput();
    return;
  }
  operationState = [...operationState, lastNumber];
  calculateTotalFromArray();
  result>=0 ? resultState.push(result) : (result = resultState[0]);
  // operationState = [];
  // operationVisualOutput = [];
  stateEqualPress = true
  updateOperationOutput();
  updateResultOutput();
  numberState = []
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
  const arrayOfSymbolsOperators = ["sqr", "^", "*", "/", "+", "-"];
  arrayOfSymbolsOperators.forEach((sym) => iterateOperationArray(sym, array));
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

  result = typeof operationState[0] === 'number' && operationState[0];
  console.log("result", result);
};
