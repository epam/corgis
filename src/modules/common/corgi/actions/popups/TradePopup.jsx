import React from 'react';
import PropTypes from 'prop-types';

import { Button, PopupWrapper } from '~modules/common';
import { Trade } from '~modules/common/corgi';

import { ACTION_MESSAGES } from '~constants/corgi';

const {
  TRADE: { POPUP_TITLE, BUTTON_DESCRIPTION },
} = ACTION_MESSAGES;

const TradePopupPropTypes = { asButton: PropTypes.bool };

const TradePopup = ({ asButton = false }) => (
  <PopupWrapper
    popup={{
      title: POPUP_TITLE,
      position: asButton ? 'top' : 'bottom-left',
      children: <Trade />,
    }}
  >
    {asButton ? <Button description={BUTTON_DESCRIPTION} /> : <span>{BUTTON_DESCRIPTION}</span>}
  </PopupWrapper>
);

TradePopup.propTypes = TradePopupPropTypes;

export default TradePopup;
