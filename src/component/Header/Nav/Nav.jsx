import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Nav.scss';

import Button from '../../utils/Button/Button';
import Dropdown from '../../Dropdown/Dropdown';
import GenerationLink from './GenerationLink/GenerationLink';

const NavPropTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  accountName: PropTypes.string.isRequired,
  requestSignOut: PropTypes.func.isRequired,
};

const Nav = ({ number, accountName, requestSignOut }) => (
  <nav className='nav'>
    <div className='nav__account'>
      <NavLink to='/account'>
        <Button description={`My Corgis ( ${number} )`} />
      </NavLink>
      <Dropdown dropdownTitle={`@${accountName}▾`}>
        <NavLink to='/profile'>
          <button>Edit Profile</button>
        </NavLink>
        <button onClick={requestSignOut}>Sign Out</button>
      </Dropdown>
    </div>
    <NavLink to='/generation'>
      <GenerationLink />
    </NavLink>
  </nav>
);
Nav.propTypes = NavPropTypes;

export default Nav;
