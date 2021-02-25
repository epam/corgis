import React, { useContext } from 'react';

import './GenerationAnimation.scss';

import shadow from '~assets/images/shadow.svg';

import { CorgiAnimFour } from '~modules/common';

import { CharacterContext } from '~contexts';

const GenerationAnimation = () => {
  const { color, backgroundColor } = useContext(CharacterContext);

  return (
    <div className='generation-animation'>
      <h3 className='generation-animation__header'>Generating...</h3>

      <div className='generation-animation__background' style={{ backgroundColor }}>
        <div className='generation-animation__corgi'>
          <CorgiAnimFour color={color} />
        </div>

        <div className='generation-animation__shadow'>
          <img src={shadow} alt='' />
        </div>
      </div>
    </div>
  );
};

export default GenerationAnimation;
