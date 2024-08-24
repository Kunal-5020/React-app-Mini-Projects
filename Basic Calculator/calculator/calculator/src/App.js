
import "./style.css";
import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OpeartionButton from "./OperationButton";

 export const Actions= {
  Add_Number : 'add-number',
  Opeartion : 'operation',
  Clear : 'clear',
  Delete : 'delete',
  Evaluate : 'evaluate'
}


function reducer(state,{type,load}){
switch(type) {
  case Actions.Add_Number:
    if(state.overwrite){
      return{
        ...state,
        currentOutput: load.digit,
        overwrite: false
      }
    }

    if (load.digit === "0" && state.currentOutput === "0") {
      return state
    }
    if (load.digit === "." && state.currentOutput.includes(".")) {
      return state
    }

    return {
      ...state,
      currentOutput: `${state.currentOutput || "" }${load.digit}`,
    }
  
  case Actions.Clear:
    return {}

  case Actions.Delete:
    if(state.overwrite){
      return {
        ...state,
        currentOutput: null,
        overwrite:false
      }
    }
    if (state.currentOutput == null){
      return{}
    }
    if (state.currentOutput.length === 1) {
      return{
        ...state,currentOutput: null
      }
    }

    return{
      ...state,
      currentOutput: state.currentOutput.slice(0,-1)
    }



  case Actions.Evaluate:
    if (state.operation == null ||
      state.currentOutput == null ||
      state.previousOutput == null
    ){
      return state
    }
     return{
      ...state,
      overwrite: true,
      previousOutput: null,
      operation : null,
      currentOutput: evaluate(state),
      
     }

  case Actions.Opeartion:
    if(state.currentOutput == null && state.previousOutput == null){
      return state
    }
    if(state.currentOutput == null){
      return{
        ...state,
        operation: load.operation

      }}
    
    if (state.previousOutput == null) {
    return {
      ...state,
     operation: load.operation,
     previousOutput: state.currentOutput,
     currentOutput: null,
    }}

   

    return{
      ...state,previousOutput: evaluate(state),
      opreation : load.operation,
      currentOutput : null
    }

}
}
function evaluate({currentOutput,previousOutput,operation}) {
  const prev=parseFloat(previousOutput)
  const current=parseFloat(currentOutput)
   if (isNaN(prev) || isNaN(current))
    return ""

   let compute = ""

   switch (operation){
    case "+":
      compute= prev + current
      break
    case "-":
      compute= prev - current
      break
    case "x":
      compute= prev * current
      break
    case "/":
      compute= prev / current
      break
    case "%":
      compute= prev/current*100  
      break
   }
   return compute.toString()
}



function App() {
  const [{currentOutput,previousOutput,operation},dispatch] =useReducer(reducer,{})

  
  return (
    <div className="calculator-grid">

      <div className="display">

        <div className="previous-output">{previousOutput}</div>
        <div className="current-output">{currentOutput}</div>

      </div>
      <button onClick= {()=> dispatch( {type: Actions.Clear})} >AC</button>
      <OpeartionButton operation="%" dispatch={dispatch}></OpeartionButton>
      <button onClick= {()=> dispatch( {type: Actions.Delete})}>←</button>
      <OpeartionButton operation="/" dispatch={dispatch}></OpeartionButton>
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <OpeartionButton operation="x" dispatch={dispatch}></OpeartionButton>
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <OpeartionButton operation="-" dispatch={dispatch}></OpeartionButton>
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <OpeartionButton operation="+" dispatch={dispatch}></OpeartionButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <DigitButton digit="." dispatch={dispatch}></DigitButton>
      <button className="span-two"  onClick= {()=> dispatch( {type: Actions.Evaluate})} >=</button>

      
      
      
     
     
    </div>
  );
}

export default App;
