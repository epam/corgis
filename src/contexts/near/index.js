import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import { initialNearState, nearReducer } from './reducer';
import { CLEAR_STATE, FINISH_LOADING, SET_USER, START_LOADING } from './types';

import { ReactChildrenTypeRequired } from '~types/ReactChildrenType';

export const NearContext = React.createContext({
  ...initialNearState,
  nearContract: null,
  signIn: () => {},
  signOut: () => {},
  startLoading: () => {},
  finishLoading: () => {},
  switchLoading: () => {},
});

const NearContextProviderPropTypes = {
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({ contractName: PropTypes.string.isRequired }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
  near: PropTypes.shape({ connection: PropTypes.object.isRequired }).isRequired,
  children: ReactChildrenTypeRequired,
};

export const NearContextProvider = ({ currentUser, nearConfig, wallet, near, children }) => {
  const [nearState, dispatchNear] = useReducer(nearReducer, initialNearState);

  const setUser = (user) => {
    dispatchNear({ type: SET_USER, payload: { user } });
  };

  const startLoading = () => {
    dispatchNear({ type: START_LOADING });
  };

  const finishLoading = () => {
    dispatchNear({ type: FINISH_LOADING });
  };

  const switchLoading = () => {
    nearState.isLoading ? finishLoading() : startLoading();
  };

  const clearState = () => {
    dispatchNear({ type: CLEAR_STATE });
  };

  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, 'NEAR Corgi');
  };

  const signOut = () => {
    wallet.signOut();

    setTimeout(() => {
      startLoading();
    }, 2000);

    clearState();
  };

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
    <NearContext.Provider
      value={{
        user: nearState.user,
        isLoading: nearState.isLoading,
        nearContent: near,
        signIn,
        signOut,
        startLoading,
        finishLoading,
        switchLoading,
      }}
    >
      {children}
    </NearContext.Provider>
  );
};

NearContextProvider.propTypes = NearContextProviderPropTypes;
