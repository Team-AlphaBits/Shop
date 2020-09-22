import React from 'react';
import './App.css';
import Head from './components/Icons/headers';
import Navbar from './components/Navbar/Navbar';
// import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Head />
     <Navbar />
    </div>
  );
}

export default App;
