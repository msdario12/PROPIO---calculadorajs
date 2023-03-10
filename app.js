// Get the containers for the numbers, operations and results
const numbersContainer = document.getElementById("numbers-container");
const operationsContainer = document.getElementById("operation-container");
const resultsContainer = document.getElementById("result-container");
const resultHistoryContainer = document.getElementById("result-history-container")
// Function to append class names to an element
const assignClassesToElement = (element, ...classes) => {
  classes.forEach((cls) => element.classList.add(cls));
};
// Create item list for a history result
const createListItemResultHistory = content => {
  const newItem = document.createElement('li')
  assignClassesToElement(newItem, "list-group-item")
  newItem.innerHTML= content
  resultHistoryContainer.appendChild(newItem)
}
// Create buttons for the numbers and add event listener to each one
for (const num of Array(11).keys()) {
  const newButton = document.createElement("button");
  newButton.textContent = num;
  // Positioning every number in a grid distribution
  switch (num) {
    case 9:
      numbersContainer.children[1].children[2].appendChild(newButton);
      break;
    case 8:
      numbersContainer.children[1].children[1].appendChild(newButton);
      break;
    case 7:
      numbersContainer.children[1].children[0].appendChild(newButton);
      break;
    case 6:
      numbersContainer.children[2].children[2].appendChild(newButton);
      break;
    case 5:
      numbersContainer.children[2].children[1].appendChild(newButton);
      break;
    case 4:
      numbersContainer.children[2].children[0].appendChild(newButton);
      break;
    case 3:
      numbersContainer.children[3].children[2].appendChild(newButton);
      break;
    case 2:
      numbersContainer.children[3].children[1].appendChild(newButton);
      break;
    case 1:
      numbersContainer.children[3].children[0].appendChild(newButton);
      break;
    case 0:
      numbersContainer.children[4].children[0].appendChild(newButton);
      break;
    case 10:
      newButton.textContent = ".";
      numbersContainer.children[4].children[1].appendChild(newButton);
      break;

    default:
      break;
  }
  // Added classes to every button number
  assignClassesToElement(newButton, "btn", "btn-primary", "my-1", "w-100");
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
  assignClassesToElement(newButton, "btn", "btn-secondary", "my-1", "w-100");
  newButton.textContent = symbol;
  switch (symbol) {
    case "Ans":
      numbersContainer.children[0].children[3].appendChild(newButton);
      break;
    case "%":
      numbersContainer.children[0].children[2].appendChild(newButton);
      break;
    case ")":
      numbersContainer.children[0].children[1].appendChild(newButton);
      break;
    case "(":
      numbersContainer.children[0].children[0].appendChild(newButton);
      break;
    case "=":
      numbersContainer.children[4].children[2].appendChild(newButton);
      break;
    case "/":
      numbersContainer.children[1].children[3].appendChild(newButton);
      break;
    case "*":
      numbersContainer.children[2].children[3].appendChild(newButton);
      break;
    case "-":
      numbersContainer.children[3].children[3].appendChild(newButton);
      break;
    case "+":
      numbersContainer.children[4].children[3].appendChild(newButton);
      break;
  }
  // Asign function to every symbol operation
  switch (symbol) {
    case "%":
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
    case "Ans":
      newButton.onclick = () => ansCallMemory();
      break;
  }
};
// Function to call a last result in memory
const ansCallMemory = () => {
  const lastValueStack = resultState[resultState.length - 1]
  const ansValue = typeof lastValueStack === 'number' && lastValueStack;
  operationState.push(ansValue);
  operationStateVisual = [...operationState, "Ans:" + ansValue];
  ansIndex = operationState.indexOf(ansValue);
  ansValueGlobal = ansValue;
  console.log("ValAns", ansValueGlobal);
  updateOperationOutput("Ans");
  console.log(operationState, "Ans");
  ansState = true;
};

// Call the function to create these operation buttons
const arrayOfSymbols = ["sqr", "^", "*", "/", "+", "-", "=", "(", ")", "Ans", "%"];
arrayOfSymbols.forEach((sym) => createButtonsOperations(sym));

// Create element to show the operation stack in the DOM
const operationOutput = document.createElement("h5");
assignClassesToElement(
  operationOutput,
  "text-end",
  "mt-2"
);
operationsContainer.appendChild(operationOutput);

// Create element to show the result value in the DOM
const resultOutput = document.createElement("h1");
assignClassesToElement(
  resultOutput,
  "text-end"
);
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
  // operationOutput.setAttribute("value", output);
  operationOutput.innerHTML = output;
};

const updateResultOutput = () => {
  // resultOutput.setAttribute("value", result);
  resultOutput.innerHTML = result
};
// Create initial values for the state
let numberState = [];
let operationState = [
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
  "+",
  1,
];
let operationStateVisual = [
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
  "+",
  1,
];
let result = 0;
let resultState = [];
let ansIndex = "";
let ansState = false;
let ansValueGlobal = "";
let operationHistoryArray = [];
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
updateResultOutput();
let stateEqualPress = false;

// START MUTATION OBSERVER
const configMutation = { attributes: true, childList: true, subtree: true };
const callback = () => {
  // console.log("resultState", resultState);
  // console.log("historyArray", operationHistoryArray);
  // console.log("As change is made");
  console.log('numberState',numberState)
  if (numberState.length === 0 && stateEqualPress === true) {
    // console.log("clear operationState");
    operationState = [];
    operationStateVisual = [];
    operationVisualOutput = [];
    //  stateEqualPress = false
  }
};
const observer = new MutationObserver(callback);
observer.observe(operationOutput, configMutation);

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
  const number = createNumberFromArray();
  if (!number && stateEqualPress && symbol !== '(' && symbol !== ')') {
    ansCallMemory();
    console.log(operationState, "ANS-operatioNState");
    stateEqualPress = false;
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
  operationState = lastNumber ? [...operationState, lastNumber] : [...operationState];
  operationStateVisual = [...operationState];  
  calculateTotalFromArray();
  result ? resultState.push(result) : (result = resultState[0]);
  stateEqualPress = true;
  handleResultHistoryList();
  updateOperationOutput();
  updateResultOutput();
  numberState = [];
  console.log("result state", resultState);
};

const handleResultHistoryList = () => {
  if (ansState) {
    const ansValueLength = ansValueGlobal.toString.length;
    const ansVisualBadge = `<span class="badge bg-secondary">Ans: ${ansValueGlobal} </span>`;
    operationStateVisual.splice(ansIndex,ansValueLength, ansVisualBadge);
    ansState = false;
  }
  operationHistoryArray.push([...operationStateVisual]);
  const resultVisualBadge = `<span class="badge bg-primary">${result}</span>`
  createListItemResultHistory(operationStateVisual.filter( e => e).reduce((a,b)=>a+b)+' = '+resultVisualBadge)
}

// Function to realize the aritmetic calc in function of the index, array and operator who is called

const calculateEval = (array) => {
  array.forEach((item, i)=>{if (item==='^') array[i]='**'})
  array.forEach((item, i)=>{if (item==='%') array[i]='/100'})
  const expression = array.reduce((a,b)=>a+b)
  let result = 0
  try {
     result = eval(expression)
  } catch (error) {
    operationState = [];
    operationVisualOutput = [];
    console.log(error)
    result = error
  }
  
  return result
}

const calculateTotalFromArray = () => {
  if (operationState.length === 0) {
    return;
  }
  const resultEval = calculateEval(operationState)
  result = resultEval
  console.log("result", result);
};
