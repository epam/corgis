import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Donation.scss';

import { Input, NearIcon } from '~modules/common';

import { CORGI_VALIDATION_MESSAGES } from '~constants/validation/corgi';
import { ContractContext } from '~contexts/contract';

const DonationPropTypes = {
  label: PropTypes.string,
  afterword: PropTypes.string,
  handleNears: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const Donation = ({ label = 'Donate', afterword = '', min, value = 0, handleNears = () => {} }) => {
  const { mintFee } = useContext(ContractContext);

  const [nears, setNears] = useState(value);

  const [errorMessage, setErrorMessage] = useState('');

  const handleNearsInput = (event) => {
    setNears(event.target.value);

    if (nears > 0) {
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

  useEffect(() => {
    setNears(value);
  }, [value]);

  return (
    <div className='donation'>
      <span className='donation__text'>{label}</span>

      <div className='donation__input'>
        <Input
          type='number'
          min={parseFloat(min || mintFee)}
          step={0.1}
          value={nears}
          onChange={handleNearsInput}
          error={errorMessage}
        />
      </div>

      <NearIcon />

      {afterword && afterword.length && <span className='donation__text'>{afterword}</span>}
    </div>
  );
};

Donation.propTypes = DonationPropTypes;

export default Donation;
