import React from 'react';
import PropTypes from 'prop-types';

import './Poster.scss';

import corgiFull from '~assets/images/corgi-full.png';

import { Button, MintingLink } from '~modules/common';

import { UserTypeShape } from '~types/NearTypes';

const PosterPropTypes = {
  requestSignIn: PropTypes.func.isRequired,
  user: UserTypeShape,
};

const Poster = ({ requestSignIn, user }) => (
  <div className='poster'>
    <div className='poster__description'>
      <p className='poster__text'>Create your own one&#8209;of&#8209;a&#8209;kind Corgi today</p>

      <p className='poster__text poster__text--small'>Mint, collect, gift and trade Corgis on Blockchain</p>

      <div className='poster__action'>
        {user ? <MintingLink big /> : <Button description='Get Started ' action={requestSignIn} />}
      </div>
    </div>

    <div className='poster__image'>
      <img className='poster__corgi' src={corgiFull} alt='' />
    </div>
  </div>
);

Poster.propTypes = PosterPropTypes;

export default Poster;
