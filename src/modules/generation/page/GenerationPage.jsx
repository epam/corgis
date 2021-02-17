import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import './GenerationPage.scss';

import classNames from 'classnames';

import raritySample from '~assets/images/rarity-sample.svg';

import { CharacterContext } from '~context/character';
import { ContractContext } from '~context/contract';

import { GenerationAnimation, GenerationForm, GenerationScreen } from '~modules/generation/components';

const GenerationPage = () => {
  const { creating, created } = useContext(ContractContext);
  const { color, backgroundColor } = useContext(CharacterContext);

  if (creating) {
    return <GenerationAnimation color={color} backgroundColor={backgroundColor} />;
  }

  if (created) {
    return <Redirect to='/account' />;
  }

  return (
    <div className='generation'>
      <h1 className='generation__title'>Create a Corgi</h1>

      <div className='generation__field'>
        <div className={classNames('generation__area', 'generation__form')}>
          <GenerationForm color={color} backgroundColor={backgroundColor} />
        </div>

        <div className={classNames('generation__area', 'generation__screen')}>
          <GenerationScreen color={color} backgroundColor={backgroundColor} />
        </div>
      </div>

      <div className='generation__footer'>
        <p className={classNames('generation__area', 'generation__description')}>
          This will create a one-of-a-kind Corgi that will develop a unique size and thought process. The size it grows
          to will untimately determine it’s value
        </p>

        <img className={classNames('generation__area', 'generation__rarity')} src={raritySample} alt='' />
      </div>
    </div>
  );
};

export default GenerationPage;
