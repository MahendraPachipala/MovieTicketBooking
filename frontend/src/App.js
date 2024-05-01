import React from 'react';
import "./App.css";
import Header from './Components/Header';
import Footer from './Components/Footer'
import Routers from './Router/Router.js';
function App() {
  return (
    <div className="App">
      <Header></Header>
       <Routers/>
      <Footer ></Footer>
    </div>
  );
}

export default App;
