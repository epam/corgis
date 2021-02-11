import React, { useContext } from 'react';

import './GenerationForm.scss';

import { GiGreekSphinx, GiBeachBall } from 'react-icons/gi';

import classNames from 'classnames';
import randomColor from 'randomcolor';

import { CharacterContext } from '../../../context/character';
import { ContractContext } from '../../../context/contract';

import { genRandomName } from '../../../helpers/generators';

import Button from '../../utils/Button/Button';

import { CorgiType } from '../../../types/CorgiTypes';
import Colorpicker from './Colorpicker/Colorpicker';

const GenerationFormPropTypes = {
  color: CorgiType.color,
  backgroundColor: CorgiType.backgroundColor,
};

const GenerationForm = () => {
  const { createCorgi } = useContext(ContractContext);
  const { name, quote, color, backgroundColor, setName, setColor, setBackgroundColor } = useContext(CharacterContext);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const generateRandomName = () => {
    setName(genRandomName());
  };

  const handleColor = (color) => {
    setColor(color);
  };

  const handleBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  const generateRandomColor = () => {
    setColor(randomColor());
    setBackgroundColor(randomColor());
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createCorgi(name, color, backgroundColor, quote);
  };

  return (
    <form className='generation-form' onSubmit={(event) => onSubmit(event)}>
      <div className={classNames('generation-form__area', 'generation-form__name')}>
        <p className='generation-form__title'>My Corgi is called</p>

        <GiGreekSphinx onClick={() => generateRandomName()} className='generation-form__icon' />

        <input
          className='generation-form__input'
          type='text'
          value={name}
          onChange={(event) => handleName(event)}
          required
        />
      </div>
      <div className={classNames('generation-form__area', 'generation-form__colors')}>
        <p className='generation-form__title'>Colors</p>

        <GiBeachBall onClick={() => generateRandomColor()} className='generation-form__icon' />

        <Colorpicker title={'Corgi'} color={color} pickColor={handleColor} />
        <Colorpicker title={'Background'} color={backgroundColor} pickColor={handleBackgroundColor} />
      </div>
      <Button description='Generate Corgi' />
    </form>
  );
};

GenerationForm.propTypes = GenerationFormPropTypes;

export default GenerationForm;
