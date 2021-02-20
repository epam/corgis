import React from 'react';
import PropTypes from 'prop-types';

import './Poster.scss';

import corgiFull from '~assets/images/corgi-full.png';

import { Button } from '~modules/common';

const PosterPropTypes = {
  requestSignIn: PropTypes.func.isRequired,
  // TODO: user type
  user: PropTypes.shape({ accountId: PropTypes.string.isRequired }),
};

const Poster = ({ requestSignIn, user }) => (
  <div className='poster container-fluid'>
    <div className='row'>
      <div className='poster__description col-lg-4'>
        <p className='poster__text'>Create your own one&#8209;of&#8209;the&#8209;kind Corgi today</p>

        <p className='poster__text poster__text--small'>Mint, collect, gift and trade Corgis on Blockchain</p>

        {!user && <Button description='Get Started ' action={requestSignIn} />}
      </div>

      <div className='poster__image col-lg-8'>
        <img className='poster__corgi' src={corgiFull} alt='' />
      </div>
    </div>
  </div>
);

Poster.propTypes = PosterPropTypes;

export default Poster;
