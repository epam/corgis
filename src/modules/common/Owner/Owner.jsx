import React from 'react';

import './Owner.scss';

import { CorgiType } from '~types/CorgiTypes';
import { Link } from 'react-router-dom';

const OwnerPropTypes = {
  name: CorgiType.owner,
};

const Owner = ({ name }) => (
  <Link to={`/user/${name}`}>
    <span className='owner'>@{name}</span>
  </Link>
);

Owner.propTypes = OwnerPropTypes;

export default Owner;
