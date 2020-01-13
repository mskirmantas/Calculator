import React, { useState } from "react";
import "../App.scss";
import { Title } from "./Title/Title";
import { Input } from "./Input/Input";
import { ButtonWrapper } from "./Buttons/ButtonWrapper";
import * as math from "mathjs";

interface CalculatorProps {
  numbers: number[];
  symbols: string[];
  addNumber: (val: number) => void;
  addOperator: (val: string) => void;
  addDot: () => void;
  calculateResult: () => null | void;
  clearDisplay: () => void;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["+", "-", "*", "/", ".", "=", "C", "AC"];

export const Calculator: React.FC = () => {
  const [name, setName] = useState<string>("Mantas' Calculator");

  const nameChangeHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
    clearDisplay();
  };

  const [input, setValue] = useState("0");
  const [result, setResult] = useState("");

  const addNumber = (val: number) => {
    setValue(input + val);
    if (input[input.length - 1] === "0") {
      setValue(input.substring(0, input.length - 1) + val);
    }
    if (result !== "") {
      setResult("");
      setValue("" + val);
    }
  };

  const addOperator = (val: string) => {
    for (let i = 0; i < numbers.length; i++) {
      if (input !== "0" && input[input.length - 1] === numbers[i].toString()) {
        setValue(input + val);
      }
      if (input !== "0" && input[input.length - 1] === ".") {
        setValue(input.substring(0, input.length - 1) + val);
      }
      if (result !== "") {
        setValue(result + val);
        setResult("");
      }
    }
  };

  const addDot = () => {
    if (input.indexOf(".") === -1) {
      setValue(input + ".");
    }
    for (let i = 0; i < symbols.length; i++) {
      if (input[input.length - 1] === symbols[i].toString()) {
        setValue(input + "0.");
      }
    }
    if (result !== "") {
      setResult("");
      setValue("0.");
    }
  };

  const calculateResult = () => {
    for (let i = 0; i < numbers.length; i++) {
      if (input !== "0" && input[input.length - 1] === numbers[i].toString()) {
        setValue(input + "=");
        setResult(math.evaluate(input).toString());
      }
      if (input.indexOf("=") !== -1) {
        return null;
      }
    }
  };

  const clearLastValue = () => {
    setValue(input.substring(0, input.length - 1));
    if (input.length === 1 || input === "0") {
      setValue("0");
    }
  };

  const clearDisplay = () => {
    setValue("0");
    setResult("");
  };

  return (
    <div className="calculator">
      <Title name={name} onNameChange={nameChangeHandler} />
      <div className="calc-container">
        <Input input={input} result={result} />
        <ButtonWrapper
          symbols={symbols}
          numbers={numbers}
          handleNumberClick={addNumber}
          handleOperatorClick={addOperator}
          handleDotClick={addDot}
          handleClear={clearDisplay}
          handleClearLast={clearLastValue}
          handleEqual={calculateResult}
        />
      </div>
    </div>
  );
};
