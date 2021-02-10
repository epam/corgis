import React from 'react';

import './AccountCorgiCard.scss';

import Corgi from '../../CorgiCard/Corgi/Corgi';
import { Dialogue } from '../../CorgiCard/Card';

import { CorgiTypeShape } from '../../../types/CorgiTypes';

const AccountCorgiCardPropTypes = { corgi: CorgiTypeShape };

const AccountCorgiCard = ({ corgi }) => (
  <div className='account-corgi'>
    <div
      className='account-corgi__card'
      style={{
        backgroundColor: corgi.backgroundColor,
      }}
    >
      <Dialogue quote={corgi.quote} color={corgi.color} />
      <Corgi color={corgi.color} sausage={corgi.sausage} />
    </div>
    <p className='account-corgi__name'>{corgi.name}</p>
    <p className='account-corgi__rate'>§ {corgi.rate}</p>
  </div>
);

AccountCorgiCard.propTypes = AccountCorgiCardPropTypes;

export default AccountCorgiCard;
