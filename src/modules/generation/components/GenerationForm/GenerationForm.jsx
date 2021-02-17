import React, { useContext, useEffect, useState } from 'react';

import './GenerationForm.scss';

import { GiGreekSphinx, GiBeachBall } from 'react-icons/gi';

import classNames from 'classnames';
import randomColor from 'randomcolor';

import { CharacterContext } from '~context/character';
import { ContractContext } from '~context/contract';

import { Button, Colorpicker } from '~modules/common';

import { genRandomName } from '~helpers/generators';

import { CORGI_VALIDATION_MESSAGES } from '~constants/validation/corgi';

import { validateCorgiName } from '~validators';

const GenerationForm = () => {
  const { createCorgi } = useContext(ContractContext);
  const { name, quote, color, backgroundColor, setName, setColor, setBackgroundColor } = useContext(CharacterContext);

  const [formError, setFormError] = useState('');

  const handleName = (event) => {
    setName(event.target.value);
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

      setFormError('');
    } else {
      setFormError(validationMessage);
    }
  };

  useEffect(() => {
    console.log(formError);
  }, [formError]);

  return (
    <form className='generation-form' onSubmit={(event) => onSubmit(event)}>
      <p className='generation-form__title'>My Corgi is called</p>

      <div className={classNames('generation-form__area', 'generation-form__name')}>
        <input
          className='generation-form__input'
          type='text'
          value={name}
          onChange={(event) => handleName(event)}
          required
        />

        <GiGreekSphinx onClick={() => generateRandomName()} className='generation-form__icon' />
      </div>

      <p className='generation-form__title'>Colors</p>

      <div className={classNames('generation-form__area', 'generation-form__colors')}>
        <div className='generation-form__colorpickers'>
          <div className='generation-form__colorpicker'>
            <Colorpicker title={'Corgi'} color={color} pickColor={handleColor} />
          </div>

          <div className='generation-form__colorpicker'>
            <Colorpicker title={'Background'} color={backgroundColor} pickColor={handleBackgroundColor} />
          </div>
        </div>

        <GiBeachBall onClick={() => generateRandomColor()} className='generation-form__icon' />
      </div>
      <Button description='Generate Corgi' />
    </form>
  );
};

export default GenerationForm;
