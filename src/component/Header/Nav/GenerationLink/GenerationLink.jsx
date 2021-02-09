import React from 'react';
import { NavLink } from 'react-router-dom';

import './GenerationLink.scss';

import IconNav from '../../../../assets/images/icon-nav.svg';

const GenerationLink = () => (
  <NavLink to='/generation'>
    <div className='generation-link'>
      <img className='generation-link__icon' src={IconNav} alt='' />
    </div>
  </NavLink>
);

export default GenerationLink;
