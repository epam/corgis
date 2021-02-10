import 'regenerator-runtime/runtime';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './Routes';

import './App.scss';

import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';

const App = () => (
  <div className='App'>
    <Router hashType='noslash'>
      <Header />
      <Routes />
      <Footer />
    </Router>
  </div>
);

export default App;
