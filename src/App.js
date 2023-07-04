import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [firstOperand,setfirstOperand] = useState("");
  let [operator,setOperator] = useState("");
  let [secondOperand,setsecondOperand] = useState("")
  let [error,setError] = useState(false);

  function clearEvent(){
      setfirstOperand("")
      setsecondOperand("")
      setOperator("")
      setError(false);
  }

  function setOperand(number){
    if(!operator)
      setfirstOperand(firstOperand+number)
    else
      setsecondOperand(secondOperand+number)
  }

  function operation(operation){
    if(!operator)
      setOperator(operation)
    else{
      if(secondOperand)
        calculateResult();
      setOperator(operation);
    }
  }

  function backspace(){
    if (!operator && firstOperand){
      setfirstOperand(firstOperand.slice(0,-1))
    }
    else if (operator && secondOperand){
      setsecondOperand(secondOperand.slice(0,-1))
    }
    else {
      return;
    }
  }

  function percentagevent(){
    if(secondOperand){
      setsecondOperand(String(Number(secondOperand)/100))
    }
    else if (firstOperand){
      setfirstOperand(String(Number(firstOperand)/100))
    }
    else{
      return;
    }
  }

  function alternatesign(){
    if (secondOperand){
      Number(secondOperand)>0? setsecondOperand("-"+secondOperand) : setsecondOperand(secondOperand.slice(1,))
    }
    else if (firstOperand){
      Number(firstOperand)>0? setfirstOperand("-"+firstOperand) : setfirstOperand(firstOperand.slice(1,))
    }
    else{
      return;
    }
  }

  function calculateResult(){
    switch(operator){
      case "add":
        setfirstOperand(String(Number(firstOperand)+Number(secondOperand)));
        setsecondOperand("");
        break;
      case "sub":
        setfirstOperand(String(Number(firstOperand)-Number(secondOperand)));
        setsecondOperand("");
        break;
      case "mul":
        setfirstOperand(String(Number(firstOperand)*Number(secondOperand)));
        setsecondOperand("");
        break;
      case "div":
        if (secondOperand === "0"){
          setError(true);
          return;
        }
        setfirstOperand(String(Number(firstOperand)/Number(secondOperand)));
        setsecondOperand("");
        break;
      default:
        return;
    }
  }

  return (
    <>
      <h3 style = {{margin : "10px 10px ",textAlign : "center"}}>Welcome to React Calculator App</h3>
      <div class="calc-body">

        <div class="calc-screen">
            <div id="calc-operation">{(secondOperand ? secondOperand : (firstOperand ? firstOperand : 0))}</div>
            <div id="calc-typed">{(error ? "Error" : firstOperand)}</div>
        </div>

      <div class="calc-button-row">
        <button class="ac" onClick={clearEvent}>AC</button>
        <button class="opt" onClick={(event) => {alternatesign()}}>&#43;&#47;&#8722;</button>
        <button class="opt" onClick={(event) => {percentagevent()}}>&#37;</button>
        <button class="opt" onClick={(event) => {operation("div")}}>&#247;</button>  {/*division operator*/}
        <button onClick={(event) => {setOperand("7")}}>7</button>
        <button onClick={(event) => {setOperand("8")}}>8</button>
        <button onClick={(event) => {setOperand("9")}}>9</button>
        <button class="opt" onClick={(event) => {operation("mul")}}>&#215;</button>   {/*multiplication operator*/}
        <button onClick={(event) => {setOperand("4")}}>4</button>
        <button onClick={(event) => {setOperand("5")}}>5</button>
        <button onClick={(event) => {setOperand("6")}}>6</button>
        <button class="opt" onClick={(event) => {operation("sub")}}>&#8722;</button>   {/*subtract operator*/}
        <button onClick={(event) => {setOperand("1")}}>1</button>
        <button onClick={(event) => {setOperand("2")}}>2</button>
        <button onClick={(event) => {setOperand("3")}}>3</button>
        <button class="opt" onClick={(event) => {operation("add")}}>&#43;</button> {/*addition operator*/}
        <button onClick={(event) => {setOperand("0")}}>0</button>
        <button onClick={(event) => {setOperand(".")}}>.</button>
        <button onClick={(event) => {backspace()}}>&#9003;</button>            {/*backspace operator*/}
        <button class="opt" onClick={(event) => {calculateResult()}}>&#61;</button>  {/*equal to*/}
      </div>
    </div>
</>
  );
}

export default App;