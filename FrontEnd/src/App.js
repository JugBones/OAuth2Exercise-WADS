import React, { useState } from 'react';
import Login from './Login';
// import { Register } from './Register';
import { Register2 } from './Register2';
import { Landing } from './Landing';
// import { Profile } from './Profile';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(){
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="App">
      {
        // currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register2 onFormSwitch={toggleForm}/>
        // currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Landing onFormSwitch={toggleForm}/>
        // <BrowserRouter>
        //   <Route>
        //       <Routes>
        //       <Route exact path = "/Login" element = {<Login/>}    />
        //       {/* <Route exact path = "/Register"   element = {<Register/>} /> */}
        //       <Route exact path = "/Register2"  element = {<Register2/>} />
        //       <Route exact path = "/Landing"    element = {<Landing/>}  />
        //       {/* <Route exact path = "/Profile"    element = {<Profile/>}  /> */}
        //       </Routes>
        //     </Route>
        // </BrowserRouter>
      }
    </div>
  ); 
}

export default App;