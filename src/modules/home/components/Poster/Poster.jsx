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
      <div className='poster__description col-xl-3'>
        <p className='poster__text'>Create your own one-of-the-kind Corgi today</p>

        <p className='poster__text poster__text--small'>Mint, collect, gift and trade Corgis on Blockchain</p>

        {!user && <Button description='Get Started ' action={requestSignIn} />}
      </div>

      <div className='poster__image col-xl-9'>
        <img className='poster__corgi' src={corgiFull} alt='' />
      </div>
    </div>
  </div>
);

Poster.propTypes = PosterPropTypes;

export default Poster;
