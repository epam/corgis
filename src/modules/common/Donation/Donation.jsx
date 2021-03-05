import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Donation.scss';

import { Input, NearIcon } from '~modules/common';
import { CORGI_VALIDATION_MESSAGES } from '~constants/validation/corgi';

const DonationPropTypes = {
  label: PropTypes.string,
  afterword: PropTypes.string,
  handleNears: PropTypes.func,
};

const Donation = ({ label = 'Donate', afterword = '', handleNears = () => {} }) => {
  const [nears, setNears] = useState(1);

  const [errorMessage, setErrorMessage] = useState('');

  const handleNearsInput = (event) => {
    setNears(event.target.value);

    if (nears >= 1) {
      handleNears(event.target.value);
    }
  };

  useEffect(() => {
    if (nears <= 0) {
      setErrorMessage(CORGI_VALIDATION_MESSAGES.NEARS);
    }
  }, [nears]);

  useEffect(() => {
    if (errorMessage && errorMessage.length) {
      setErrorMessage('');
    }
  }, [errorMessage]);

  return (
    <div className='donation'>
      <span className='donation__text'>{label}</span>

      <div className='donation__input'>
        <Input type='number' min={1} value={nears} onChange={handleNearsInput} error={errorMessage} />
      </div>

      <NearIcon />

      {afterword && afterword.length && <span className='donation__text'>{afterword}</span>}
    </div>
  );
};

export default Donation;
