import 'regenerator-runtime/runtime';

import React, { useContext, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import './App.scss';

import { ContractContext, NearContext } from '~contexts';

import { Header } from '~modules/header';
import { Footer } from '~modules/footer';

import Routes from '~router/Routes';

const App = () => {
  const { user } = useContext(NearContext);
  const { created, deleted, transfered, getCorgisByCurrentUser, clearState } = useContext(ContractContext);

  useEffect(() => {
    if (created || deleted || transfered) {
      clearState();
    }
  }, [created, deleted, transfered]);

  useEffect(() => {
    if (user && !created && !deleted && !transfered) {
      getCorgisByCurrentUser();
    }
  }, [user, created, deleted, transfered]);

  return (
    <div className='App'>
      <div className='page'>
        <Router hashType='noslash'>
          <Header />
          <Routes />
        </Router>
      </div>

      <Footer />
    </div>
  );
};

export default App;
