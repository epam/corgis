import React from 'react';
import { Link } from 'react-router-dom';

import './Owner.scss';

import { CorgiType } from '~types/CorgiTypes';

const OwnerPropTypes = { name: CorgiType.owner };

const Owner = ({ name }) => (
  <Link to={`/user/${name}`} className='owner' style={{ maxWidth: '100%' }}>
    <span className='owner__name'>@{name}</span>
  </Link>
);

Owner.propTypes = OwnerPropTypes;

export default Owner;
