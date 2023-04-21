import './App.css';
// import './Pages/styles.css';
import React from 'react';
import {useState} from 'react';
import {Route, Routes} from "react-router-dom";

import Login from'./Login';
import Register from'./Register';
import TaskManager from './TaskManager';




function App() {

  // to set the current value of the state to display
  const[currentForm, setCurrentForm] = useState("login"); 

  return (
    <main className="App">
      {/* {
        // if form is not login, display register (ternary)
        currentForm === "login" ? <Login /> :  <Register /> 
      } */}
      {/* <Register />
      <Login /> */}
      
      <><Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/taskmanager" element={<TaskManager />} />
     </Routes>
     </>
     
      
    </main>
  );
}

export default App;
