import React, { useContext } from 'react';

import './GenerationScreen.scss';

import { Egg } from '~modules/common';

import { CharacterContext } from '~contexts';

import tinycolor from 'tinycolor2';

const GenerationScreen = () => {
  const { color, backgroundColor } = useContext(CharacterContext);

  const textColor = tinycolor.mostReadable(backgroundColor, [color, '#fff', '#000']).toHexString();

  return (
    <div className='generation-screen' style={{ backgroundColor, color: textColor }}>
      <Egg color={color} showShadow={true} />
    </div>
  );
};

export default GenerationScreen;
