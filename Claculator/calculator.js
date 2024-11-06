const calcDisplay = document.querySelector('.display');
const updateDisplay = (number) => { calcDisplay.value = number }

const numbers = document.querySelectorAll('.numbers');
let prevInput = '0';
let calcOperator = '';
let currInput = '0';

const inputNumber = (number) => {
  if (currInput === '0') {
    currInput = number
  } else {
    currInput = currInput + number
  }
}

numbers.forEach(number => {
  number.addEventListener('click', () => {
    inputNumber(number.value)
    updateDisplay(currInput)
  })
});

const operators = document.querySelectorAll('.operator');

const inputOperator = (operator) => {
  prevInput = currInput;
  calcOperator = operator
  updateDisplay(operator)
  currInput = '0'
}

operators.forEach(operator => {
  operator.addEventListener('click', () => {
    inputOperator(operator.value)
  })
});

const equal = document.querySelector('.equal');

const calculate = () => {
  if (!calcOperator) {
    console.error('Error: No operator selected');
    return;
  }

  let result = 0
  switch (calcOperator) {
    case '+':
      result = parseInt(prevInput) + parseInt(currInput)
      break;
    case '-':
      result = parseInt(prevInput) - parseInt(currInput)
      break;
    case '*':
      result = parseInt(prevInput) * parseInt(currInput)
      break;
    case '/':
      if (currInput === '0') {
        throw new Error('Error: Division by zero');
      } else {
        result = parseInt(prevInput) / parseInt(currInput)
      }
      break;
    case '%':
      result = (parseInt(prevInput) / 100) * parseInt(currInput)
      break;
    default:
      throw new Error(`Error: Unsupported operator '${calcOperator}'`);
  }
  currInput = result.toString()
  calcOperator = ''
}

const clearBtn = document.querySelector('.all-clear');

const clearAll = () => {
  prevInput = '0'
  calcOperator = ''
  currInput = '0'
}

clearBtn.addEventListener('click', () => {
  clearAll();
  updateDisplay('0')
})

equal.addEventListener('click', () => {
  calculate();
  updateDisplay(currInput);
})
