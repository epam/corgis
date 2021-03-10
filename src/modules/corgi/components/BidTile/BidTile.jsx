import React from 'react';

import './BidTile.scss';

import { Owner } from '~modules/common';
import { BidAmount } from '~modules/corgi/components';

import { humanizeTime } from '~helpers/time';

import { BidTypeShape } from '~types/BidTypes';

const BidTilePropTypes = { bid: BidTypeShape.isRequired };

const auctionTimerOptions = {
  delimiter: '',
  spacer: ' ',
  largest: 1,
  round: true,
  short: true,
};

const BidTile = ({ bid: { amount, bidder, timestamp } }) => (
  <div className='bid'>
    <span className='bid__info bid__info--near'>
      <BidAmount amount={amount} />
    </span>

    <span className='bid__info bid__info--bidder'>
      <Owner name={bidder} />
    </span>

    <span className='bid__info bid__info--time'>{humanizeTime(timestamp, auctionTimerOptions)}</span>
  </div>
);

BidTile.propTypes = BidTilePropTypes;

export default BidTile;
