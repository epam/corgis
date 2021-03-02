import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import { ContractContext, CorgiActionsContext } from '~contexts';

import { BasicSpinner, Button, PopupWrapper } from '~modules/common';
import { Confirmation } from '~modules/common/corgi';

import { ACTION_MESSAGES } from '~constants/corgi';

const {
  DELETE: { POPUP_TITLE, POPUP_TITLE_ACTION_CONFIRMED, BUTTON_DESCRIPTION },
} = ACTION_MESSAGES;

const DeletePopupPropTypes = { asButton: PropTypes.bool };

const DeletePopup = ({ asButton = false }) => {
  const { id } = useContext(CorgiActionsContext);
  const { deleting, deleteCorgi } = useContext(ContractContext);

  const popupRef = useRef();

  const onConfirm = () => {
    deleteCorgi(id);
  };

  const onReject = () => {
    if (popupRef && popupRef.current) {
      popupRef.current.hidePopup();
    }
  };

  return (
    <PopupWrapper
      ref={popupRef}
      popup={{
        title: !deleting ? POPUP_TITLE : POPUP_TITLE_ACTION_CONFIRMED,
        position: asButton ? 'top' : 'bottom-left',
        children: !deleting ? <Confirmation onConfirm={onConfirm} onReject={onReject} /> : <BasicSpinner />,
      }}
    >
      {asButton ? <Button description={BUTTON_DESCRIPTION} danger /> : <span>{BUTTON_DESCRIPTION}</span>}
    </PopupWrapper>
  );
};

DeletePopup.propTypes = DeletePopupPropTypes;

export default DeletePopup;
