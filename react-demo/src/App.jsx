import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Hello from "./Hello";
const App =()=> {
  const [first, setfirst] = useState(0)
  const handleClick = (e)=>{
   
    setTimeout(()=>{
      setfirst(first+1);
      setfirst(first+1);
      setfirst(first+1);
      setfirst(first+1);
      setfirst(first+1);
    },0)
    console.log('handleClick',e)
  }
  const handleChange = (e)=>{
    console.log('handleChange')
  }
  return (
    <div className="App">
      <header className="App-header">
        <input onInput={handleChange}/>
        <Hello />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <button onClick={handleClick} onClickCapture={()=>console.log('onClickCapture')}>click{first}</button>
        </div>
      </header>
    </div>
  );
}
// console.log('app', App())
export default App;
