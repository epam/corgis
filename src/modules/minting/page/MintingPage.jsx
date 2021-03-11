import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import './MintingPage.scss';

import { CharacterContext, ContractContext, NearContext } from '~contexts';

import { MintingAnimation, MintingDescription, MintingForm, MintingScreen } from '~modules/minting/components';

const MintingPage = () => {
  const { user } = useContext(NearContext);
  const { corgis, creating, created } = useContext(ContractContext);
  const { generateRandomCharacter } = useContext(CharacterContext);

  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    const corgisLength = localStorage.getItem('corgisLength');

    if (corgisLength && corgis && corgisLength !== corgis.length) {
      localStorage.removeItem('corgisLength');
      setIsRedirected(true);
    }
  }, [corgis]);

  useEffect(() => {
    generateRandomCharacter();
  }, [created]);

  if (creating) {
    localStorage.setItem('corgisLength', corgis ? corgis.length : 0);
  }

  if (isRedirected || created) {
    return <Redirect to={user ? `/user/${user.accountId}` : '/'} />;
  }

  return (
    <div className='minting'>
      <h1 className='minting__title'>{creating ? 'Minting...' : 'Create a Corgi'}</h1>

      {creating ? (
        <MintingAnimation />
      ) : (
        <div className='minting__field'>
          <div className='minting__form'>
            <MintingForm />
          </div>

          <div className='minting__screen'>
            <MintingScreen />
          </div>

          <div className='minting__description'>
            <MintingDescription />
          </div>
        </div>
      )}
    </div>
  );
};

export default MintingPage;
