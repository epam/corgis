import React, { useContext } from 'react';

import './BidTile.scss';

import { NearContext } from '~contexts';

import { Owner } from '~modules/common';
import { BidAmount } from '~modules/common/corgi';

import { humanizeTime } from '~helpers/time';

import { BidTypeShape } from '~types/BidTypes';

const BidTilePropTypes = { bid: BidTypeShape.isRequired };

const auctionTimerOptions = {
  delimiter: '',
  spacer: ' ',
  largest: 1,
  round: true,
  short: true,
  units: ['d', 'h', 'm', 's'],
};

const BidTile = ({ bid: { amount, bidder, timestamp } }) => {
  const { user } = useContext(NearContext);

  return (
    <div className='bid'>
      <span className='bid__info bid__info--near'>
        <BidAmount amount={amount} trim />
      </span>

      <span className='bid__info bid__info--bidder'>
        <Owner name={bidder} highlight={user && user.accountId === bidder} />
      </span>

      <span className='bid__info bid__info--time'>{humanizeTime(timestamp, auctionTimerOptions)}</span>
    </div>
  );
};

BidTile.propTypes = BidTilePropTypes;

export default BidTile;
