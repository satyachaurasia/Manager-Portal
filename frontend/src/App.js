import React from 'react';
import  { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import Header from './components/Header';


function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <BaseRouter />

      </Router>
      
    </div>
  );
}

export default App;
