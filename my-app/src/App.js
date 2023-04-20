import './App.css';
import React from 'react';
import {useState} from 'react';
import Login from'./Login';
import Register from'./Register';

function App() {

  // to set the current value of the state to display
  const[currentForm, setCurrentForm] = useState("login"); 

  return (
    <main className="App">
      {/* {
        // if form is not login, display register (ternary)
        currentform === "login" ? <Login /> :  <Register /> 
      } */}
      <Login />
      
    </main>
  );
}

export default App;
