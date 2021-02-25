import React, { useContext, useEffect, useState } from 'react';

import './GenerationForm.scss';

import { FaRandom } from 'react-icons/fa';

import randomColor from 'randomcolor';

import { CharacterContext, ContractContext } from '~contexts';

import { Button, Colorpicker, Input } from '~modules/common';
import { Donation } from '~modules/generation/components';

import { genRandomName } from '~helpers/generators';

import { CORGI_VALIDATION_MESSAGES } from '~constants/validation/corgi';

import { validateCorgiName } from '~validators';

const GenerationForm = () => {
  const { createCorgi } = useContext(ContractContext);
  const { name, quote, color, backgroundColor, setName, setColor, setBackgroundColor } = useContext(CharacterContext);

  const [errorMessage, setErrorMessage] = useState('');

  const clearError = () => {
    setErrorMessage('');
  };

  const handleName = (event) => {
    setName(event.target.value);
    clearError();
  };

  const generateRandomName = () => {
    setName(genRandomName());
  };

  const handleColor = (newColor) => {
    setColor(newColor);
  };

  const handleBackgroundColor = (newColor) => {
    setBackgroundColor(newColor);
  };

  const generateRandomColor = () => {
    setColor(randomColor());
    setBackgroundColor(randomColor());
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const validationMessage = validateCorgiName(name);

    if (validationMessage === CORGI_VALIDATION_MESSAGES.SUCCESS) {
      createCorgi(name, color, backgroundColor, quote);
    } else {
      setErrorMessage(validationMessage);
    }
  };

  useEffect(() => {
    clearError();
  }, [errorMessage]);

  return (
    <form className='generation-form' onSubmit={(event) => onSubmit(event)}>
      <div className='generation-form__area'>
        <div className='generation-form__header'>
          <h3 className='generation-form__title'>My Corgi is called</h3>
          <FaRandom onClick={() => generateRandomName()} className='generation-form__icon' />
        </div>

        <Input type='text' value={name} onChange={handleName} placeholder='Sweet Corgi' error={errorMessage} required />
      </div>

      <div className='generation-form__area'>
        <div className='generation-form__header'>
          <h3 className='generation-form__title'>Colors</h3>
          <FaRandom onClick={() => generateRandomColor()} className='generation-form__icon' />
        </div>

        <div className='generation-form__colorpickers'>
          <div className='generation-form__colorpicker'>
            <Colorpicker title={'Corgi'} color={color} pickColor={handleColor} />
          </div>

          <div className='generation-form__colorpicker'>
            <Colorpicker title={'Background'} color={backgroundColor} pickColor={handleBackgroundColor} />
          </div>
        </div>
      </div>

      <div className='generation-form__area'>
        {/* // Feature not yet approved  
        <div className='generation-form__donation'>
          <Donation />
        </div> */}

        <Button description='Mint Corgi' />
      </div>
    </form>
  );
};

export default GenerationForm;
