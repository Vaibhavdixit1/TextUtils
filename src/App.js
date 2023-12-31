// Import Contact component at the top
import './App.css';
import About from './Components/About';
import Navbar from './Components/Navbar';
import TextForm from './Components/TextForm';
import Contact from './Components/Contact'; 

import React, { useState } from 'react';
import Alert from './Components/Alert';
import Footer from './Components/Footer';
import SingleAbout from './Components/SingleAbout'; 
import YusufSingle from './Components/YusufSingle';
import DhairyaSingle from './Components/DhairyaSingle';
import JohnSingle from './Components/JohnSingle';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";




function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);
  
  

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

const toggleMode = () => {
  if (mode === 'light') {
    setMode('dark');
    document.body.style.backgroundColor = '#042743'; // Set the background color to #042743
    showAlert("Dark mode has been enabled", "success");
  } else {
    setMode('light');
    document.body.style.backgroundColor = 'white';
    showAlert("Light mode has been enabled", "success");
  }
}

  return (
    <>
      <Router>
      <Navbar 
          title="TextSculptor"
          mode={mode}
          toggleMode={toggleMode}
          logo="/images/logo.png"  
          key={new Date()}
        />
        <Alert alert={alert} />
        <div className=" my-3">
          <Switch>
            <Route exact path="/about">
              <About mode={mode} />
            </Route>
            <Route path="/SingleAbout.js"><SingleAbout mode={mode}/></Route>
            <Route path="/YusufSingle.js"><YusufSingle mode={mode}/></Route>
            <Route path="/DhairyaSingle.js"><DhairyaSingle mode={mode}/> </Route>
            <Route path="/JohnSingle.js"> <JohnSingle mode ={mode}/></Route>
            <Route exact path="/contact">
              <Contact mode={mode} />
            </Route>
            <Route exact path="/">
              <TextForm showAlert={showAlert} heading="Try TextSculptor - word counter, character counter, remove extra spaces" mode={mode} />
            </Route>
          </Switch>
        </div>
        <Footer /> 
      </Router>
    </>
  );
}

export default App;
