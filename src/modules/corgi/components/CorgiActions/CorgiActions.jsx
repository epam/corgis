import React, { useContext, useEffect, useRef } from 'react';

import './CorgiActions.scss';

import { ContractContext } from '~contexts/';

import { BasicSpinner, Button, PopupWrapper } from '~modules/common';
import { Confirmation, Share, Transfer } from '~modules/common/corgi';

import { CorgiType } from '~types/CorgiTypes';

const CorgiActionsPropTypes = {
  id: CorgiType.id.isRequired,
};

const CorgiActions = ({ id }) => {
  const { deleteCorgi, deleting } = useContext(ContractContext);

  const confirmationPopupRef = useRef();

  const onConfirm = () => {
    deleteCorgi(id);
  };

  const onReject = () => {
    if (confirmationPopupRef && confirmationPopupRef.current) {
      confirmationPopupRef.current.hidePopup();
    }
  };

  useEffect(() => {
    if (!deleting && confirmationPopupRef && confirmationPopupRef.current) {
      confirmationPopupRef.current.hidePopup();
    }
  }, [deleting, confirmationPopupRef]);

  return (
    <div className='corgi-actions'>
      <PopupWrapper popup={{ title: 'Gift me to your friend!', position: 'top', children: <Transfer id={id} /> }}>
        <Button description='Gift' />
      </PopupWrapper>

      <PopupWrapper popup={{ title: 'Trade', position: 'top', children: <span>In development...</span> }}>
        <Button description='Trade' />
      </PopupWrapper>

      <PopupWrapper popup={{ title: 'Share', position: 'top', children: <Share id={id} /> }}>
        <Button description='Share' />
      </PopupWrapper>

      <PopupWrapper
        ref={confirmationPopupRef}
        popup={{
          title: !deleting ? 'Are you sure?' : 'Deleting...',
          position: 'top',
          children: !deleting ? <Confirmation onConfirm={onConfirm} onReject={onReject} /> : <BasicSpinner />,
        }}
      >
        <Button description='Delete' danger />
      </PopupWrapper>
    </div>
  );
};

CorgiActions.propTypes = CorgiActionsPropTypes;

export default CorgiActions;
