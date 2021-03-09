/* global document:true */
import React from 'react';
import ReactDOM from 'react-dom';

import * as nearAPI from 'near-api-js';

import fs from 'fs';

import getConfig from './config';

import { ContractContextProvider, MarketplaceContextProvider, NearContextProvider } from '~contexts';

import { CorgiMethods, MarketplaceMethods } from '~constants/contractMethods';

import App from './App';

const corgiConfig = JSON.parse(fs.readFileSync('contract/config.json'));
const MINT_FEE = nearAPI.utils.format.formatNearAmount(corgiConfig.mint_fee.replace(/_/g, ''));

// Initializing contract
async function InitContract() {
  const nearConfig = getConfig(process.env.NODE_ENV || 'development');

  // Initializing connection to the NEAR
  const near = await nearAPI.connect({
    deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() },
    ...nearConfig,
  });

  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near);

  // Load in account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    };
  }

  // Initializing our contract APIs by contract name and configuration.
  const contract = new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: [...CorgiMethods.viewMethods, ...MarketplaceMethods.viewMethods],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: [...CorgiMethods.changeMethods, ...MarketplaceMethods.changeMethods],
    // Sender is the account ID to initialize transactions.
    sender: walletConnection.getAccountId(),
  });

  return {
    contract,
    currentUser,
    nearConfig,
    walletConnection,
    near,
  };
}

window.nearInitPromise = InitContract()
  .then(({ contract, currentUser, nearConfig, walletConnection, near }) => {
    const app = (
      <NearContextProvider currentUser={currentUser} nearConfig={nearConfig} wallet={walletConnection} near={near}>
        <ContractContextProvider Contract={contract} mintFee={MINT_FEE}>
          <MarketplaceContextProvider Contract={contract}>
            <App />
          </MarketplaceContextProvider>
        </ContractContextProvider>
      </NearContextProvider>
    );

    ReactDOM.render(app, document.getElementById('root'));
  })
  .catch(console.error);
