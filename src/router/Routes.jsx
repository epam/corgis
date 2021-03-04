import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { CharacterContextProvider, NearContext } from '~contexts';

import GuardedRoute from '~router/GuardedRoute';

import { CorgiPage, HomePage, MintingPage, UserPage, MarketplacePage } from '~modules/pages';

const Routes = () => {
  const { user, isLoading } = useContext(NearContext);

  const isAuthenticated = !!user;

  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>

      <Route exact path='/corgi/:id+'>
        <CorgiPage />
      </Route>

      <Route exact path='/user/:id'>
        <UserPage />
      </Route>

      <Route exact path='/marketplace'>
        <MarketplacePage />
      </Route>

      <GuardedRoute auth={isAuthenticated} isLoading={isLoading} exact path='/minting'>
        <CharacterContextProvider>
          <MintingPage />
        </CharacterContextProvider>
      </GuardedRoute>

      <Route>
        <h1>Not found This page. Please go back to continue or you can contact us about the issue.</h1>
      </Route>
    </Switch>
  );
};

export default Routes;
