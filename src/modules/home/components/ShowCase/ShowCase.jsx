import React from 'react';

import './ShowCase.scss';

import { CorgiCard } from '~modules/common';

import { CorgisArrayType } from '~types/CorgiTypes';

const ShowCasePropTypes = { corgis: CorgisArrayType.isRequired };

const ShowCase = ({ corgis }) => (
  <div className='showcase'>
    {corgis.map((corgi) => (
      <CorgiCard corgi={corgi} key={corgi.id} showOwner showRarity />
    ))}
  </div>
);

ShowCase.propTypes = ShowCasePropTypes;

export default ShowCase;
