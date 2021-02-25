import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import './GenerationPage.scss';

import { ContractContext } from '~contexts';

import {
  GenerationAnimation,
  GenerationDescription,
  GenerationForm,
  GenerationScreen,
} from '~modules/generation/components';
import { CharacterContext } from '~contexts/';

const GenerationPage = () => {
  const { creating, created } = useContext(ContractContext);
  const { generateRandomCharacter } = useContext(CharacterContext);

  useEffect(() => {
    generateRandomCharacter();
  }, [created]);

  if (creating) {
    return <GenerationAnimation />;
  }

  if (created) {
    return <Redirect to='/account' />;
  }

  return (
    <div className='generation'>
      <h1 className='generation__header'>Create a Corgi</h1>

      <div className='generation__field'>
        <div className='generation__form'>
          <GenerationForm />
        </div>

        <div className='generation__screen'>
          <GenerationScreen />
        </div>

        <div className='generation__description'>
          <GenerationDescription />
        </div>
      </div>
    </div>
  );
};

export default GenerationPage;
