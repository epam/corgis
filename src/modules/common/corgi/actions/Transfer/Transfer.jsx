import React, { useContext, useState } from 'react';

import './Transfer.scss';

import * as nearlib from 'near-api-js';

import { ContractContext, NearContext } from '~contexts';

import { Button, Input } from '~modules/common';

import { CorgiType } from '~types/CorgiTypes';

const TransferPropTypes = { id: CorgiType.id };

const Transfer = ({ id }) => {
  const { nearContent, user } = useContext(NearContext);
  const { transfering, transferCorgi } = useContext(ContractContext);

  const [receiver, setReceiver] = useState('');

  const handleReceiverInput = (event) => {
    setReceiver(event.target.value);
  };

  const checkAccountLegit = async (newReceiver) => {
    try {
      return !!(await new nearlib.Account(nearContent.connection, newReceiver).state());
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const sendCorgi = () => {
    transferCorgi(receiver, id);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (receiver === user.accountId) {
      console.error("you can't specify your own account");
      return;
    }

    if (await checkAccountLegit(receiver)) {
      sendCorgi();
    }
  };

  return (
    <form className='transfer' onSubmit={(event) => onSubmit(event)}>
      <div className='transfer__input'>
        <Input
          value={receiver}
          onChange={(event) => handleReceiverInput(event)}
          placeholder='new-owner.testnet'
          type='text'
          required
        />
      </div>

      <div className='transfer__submit'>
        {!transfering ? <Button description='submit' /> : <div className='spinner-border'></div>}
      </div>
    </form>
  );
};

Transfer.propTypes = TransferPropTypes;

export default Transfer;
