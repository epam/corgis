import React from 'react';
import PropTypes from 'prop-types';

import './CorgiTile.scss';

import Corgi from '../CorgiCard/Corgi/Corgi';
import { Dialogue } from '../CorgiCard/Card';

import { CorgiTypeShape } from '../../types/CorgiTypes';
import { ReactChildrenType } from '../../types/ReactChildrenType';

const CorgiTilePropTypes = {
  corgi: CorgiTypeShape,
  description: PropTypes.string,
  children: ReactChildrenType,
};

const CorgiTile = ({ corgi, description, children }) => (
  <div className='corgi-tile'>
    <div
      className='corgi-tile__card'
      style={{
        backgroundColor: corgi.backgroundColor,
      }}
    >
      <Dialogue quote={corgi.quote} color={corgi.color} />
      <Corgi color={corgi.color} sausage={corgi.sausage} />
    </div>
    <p className='corgi-tile__name'>{corgi.name}</p>
    <p className='corgi-tile__description'>{children || description || `§ ${corgi.rate}`}</p>
  </div>
);

CorgiTile.propTypes = CorgiTilePropTypes;

export default CorgiTile;
