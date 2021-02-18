import React from 'react';

import './Quote.scss';

import classNames from 'classnames';

import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

import { CorgiType } from '~types/CorgiTypes';
import { CardSizeType } from '~types/CardSizeType';
import { getQuoteById } from '~helpers/quotes';

const QuotePropTypes = {
  color: CorgiType.color,
  quoteId: CorgiType.quote,
  size: CardSizeType,
};

const quoteIconSize = '0.8em';

const Quote = ({ color = '#fafafa', quoteId = '0', size = 'small' }) => (
  <div className={classNames('quote', `quote--${size}`)}>
    <p className='quote__text' style={{ color }}>
      <FaQuoteLeft size={quoteIconSize} /> {getQuoteById(quoteId)} <FaQuoteRight size={quoteIconSize} />
    </p>
  </div>
);

Quote.propTypes = QuotePropTypes;

export default Quote;