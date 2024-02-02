import React, { SyntheticEvent, useState } from 'react';

import './App.css';

function App() {
  const [result, setResult] = useState<number | null>(null);
  const [numberToTakeSquareRootOf, setNumberToTakeSquareRootOf] = useState<
    number | null
  >(null);
  const [precision, setPrecision] = useState<number | null>(null);

  const handleNumberToFindSquareRootOfChange = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setNumberToTakeSquareRootOf(!!target.value ? Number.parseFloat(target.value) : null);
  };

  const handlePrecisionChange = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setPrecision(!!target.value ? Number.parseFloat(target.value) : null);
  };

  // Reference: https://stackoverflow.com/questions/52468506/how-to-calculate-the-square-root-without-using-library-and-built-in-methods-in-j
  const calculateSquareRoot = (): void => {
    if (precision !== null && precision <= 0) {
      alert('Please enter a positive integer for the precision input.');
      return;
    }

    if (numberToTakeSquareRootOf !== null && numberToTakeSquareRootOf < 0) {
      alert('Please enter a positive number to take the square root of.');
      return;
    }

    if (numberToTakeSquareRootOf === 0 || numberToTakeSquareRootOf === 1) {
      setResult(numberToTakeSquareRootOf);
      return;
    }

    let x;
    let x1 = (numberToTakeSquareRootOf as number) / 2;

    do {
      x = x1;
      x1 = (x + (numberToTakeSquareRootOf as number) / x) / 2;
    } while (x !== x1);

    setResult(Number.parseFloat(x.toFixed(precision as number)));
  };

  return (
    <div className="App">
      <header>
        <h1>Find the square root!</h1>
      </header>
      <main>
        <label htmlFor="number-to-find-square-root-of">
          Enter the number you would like to find the square root of.
        </label>
        <input
          id="number-to-find-square-root-of"
          name="number-to-find-square-root-of"
          placeholder="Enter number..."
          type="number"
          min="0"
          onChange={handleNumberToFindSquareRootOfChange}
        />
        <label htmlFor="precision">
          Enter an integer representing the precision. (Ex. 4 = .XXXX)
        </label>
        <input
          id="precision"
          name="precision"
          placeholder="Enter precision..."
          type="number"
          min="1"
          onChange={handlePrecisionChange}
        />
        <button
          disabled={precision === null || numberToTakeSquareRootOf === null}
          onClick={calculateSquareRoot}
        >
          Calculate!
        </button>
        {(!!result || result === 0) && <h2>Result: {result}</h2>}
      </main>
    </div>
  );
}

export default App;
