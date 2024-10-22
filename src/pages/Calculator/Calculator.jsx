import React, { useState, useEffect } from 'react';
import './Calculator.css';

function Calculator() {
  const [currentInput, setCurrentInput] = useState('0');
  const [previousInput, setPreviousInput] = useState('');
  const [operator, setOperator] = useState(null);
  const [lastOperator, setLastOperator] = useState(null);
  const [lastValue, setLastValue] = useState(null);
  const [resetInput, setResetInput] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [activeOperator, setActiveOperator] = useState(null);


  const inputNumber = (num) => {
    if (resetInput) {
      setCurrentInput(String(num));
      setResetInput(false);
    } else {
      setCurrentInput(currentInput === '0' ? String(num) : currentInput + num);
    }
    setIsResult(false);
  };

  const inputDecimal = () => {
    if (!currentInput.includes('.')) {
      setCurrentInput(currentInput + '.');
    }
  };

  const clearAll = () => {
    setCurrentInput('0');
    setPreviousInput('');
    setOperator(null);
    setLastOperator(null);
    setLastValue(null);
    setResetInput(false);
    setIsResult(false);
    setActiveOperator(null);
  };

  const clearEntry = () => {
    setCurrentInput('0');
  };

  const inputOperator = (op) => {
    if (isResult) {
      setPreviousInput(currentInput);
      setIsResult(false);
    } else if (operator && !resetInput) {
      calculateResult();
    } else {
      setPreviousInput(currentInput);
    }

    setOperator(op);
    setActiveOperator(op);
    setResetInput(true);
  };

  
  const calculateResult = () => {
    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);

 
    if (!operator && !lastOperator) return;

    if (isResult && lastOperator) {
      prev = parseFloat(currentInput);
      curr = lastValue;
      setOperator(lastOperator);
    } else {
      setLastValue(curr);
      setLastOperator(operator);
    }

    let result;
    switch (operator || lastOperator) { 
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        result = curr !== 0 ? prev / curr : 'Error';
        break;
      case '%':
        result = prev % curr;
        break;
      default:
        return;
    }

    setCurrentInput(String(result));
    setOperator(null); 
    setResetInput(true);
    setIsResult(true);
    setActiveOperator(null); 
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      const numKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const operatorKeys = {
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        '%': '%',
        '.': '.',
        'Enter': '=',
      };

      if (numKeys.includes(key)) {
        inputNumber(key);
      } else if (key in operatorKeys) {
        if (key === 'Enter') {
          calculateResult();
        } else {
          inputOperator(operatorKeys[key]);
        }
      } else if (key === 'Escape') {
        clearAll();
      } else if (key === 'Backspace') {
        clearEntry();
      }
    };

    document.addEventListener('keydown', handleKeyDown);


    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentInput, operator, isResult]);

  return (
    <div className='calculator-container'>
      {/* <h1>CALCULATOR</h1> */}
      <div className='calculator'>
        <div className='display'>
          <input type="text" value={currentInput} id='result' readOnly />
        </div>
        <div className='buttons'>
          <button className="button" onClick={clearAll}>AC</button>
          <button className="button" onClick={clearEntry}>C</button>
          <button className={`button orange ${activeOperator === '%' ? 'active' : ''}`} onClick={() => inputOperator('%')}>%</button>
          <button className={`button orange ${activeOperator === '/' ? 'active' : ''}`} onClick={() => inputOperator('/')}>÷</button>

          <button className="button" onClick={() => inputNumber(7)}>7</button>
          <button className="button" onClick={() => inputNumber(8)}>8</button>
          <button className="button" onClick={() => inputNumber(9)}>9</button>
          <button className={`button orange ${activeOperator === '*' ? 'active' : ''}`} onClick={() => inputOperator('*')}>×</button>

          <button className="button" onClick={() => inputNumber(4)}>4</button>
          <button className="button" onClick={() => inputNumber(5)}>5</button>
          <button className="button" onClick={() => inputNumber(6)}>6</button>
          <button className={`button orange ${activeOperator === '-' ? 'active' : ''}`} onClick={() => inputOperator('-')}>−</button>

          <button className="button" onClick={() => inputNumber(1)}>1</button>
          <button className="button" onClick={() => inputNumber(2)}>2</button>
          <button className="button" onClick={() => inputNumber(3)}>3</button>
          <button className={`button orange ${activeOperator === '+' ? 'active' : ''}`} onClick={() => inputOperator('+')}>+</button>

          <button className="button wide" onClick={() => inputNumber(0)}>0</button>
          <button className="button" onClick={inputDecimal}>.</button>
          <button className="button orange" onClick={calculateResult}>=</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
