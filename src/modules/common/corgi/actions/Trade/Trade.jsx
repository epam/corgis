import React, { useState } from 'react';

import { Input } from '~modules/common';
import { Confirmation } from '~modules/common/corgi';

import './Trade.scss';

const Trade = () => {
  const [bid, setBid] = useState(1);

  const [errorMessage, setErrorMessage] = useState('');

  const clearError = () => {
    setErrorMessage('');
  };

  const handleBidInput = (event) => {
    setBid(event.target.value);
    clearError();
  };

  const onConfirm = (event) => {
    event.preventDefault();

    clearError();

    console.log('Confirmed');
    console.log(`Bid is: ${bid}`);
  };

  const onReject = (event) => {
    event.preventDefault();

    console.log('Rejected');
  };

  return (
    <form className='trade'>
      <div className='trade__input'>
        <Input
          value={bid}
          onChange={handleBidInput}
          placeholder='1 Ⓝ'
          type='number'
          error={errorMessage}
          label='Minimal bid:'
          min={0}
          autoFocus
          required
        />
      </div>

      <div className='trade__confirmation'>
        <Confirmation onConfirm={onConfirm} onReject={onReject} />
      </div>
    </form>
  );
};

export default Trade;
