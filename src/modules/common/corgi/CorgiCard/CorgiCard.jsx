import React from 'react';
import { Link } from 'react-router-dom';

import './CorgiCard.scss';

import { CorgiSVG, Quote, RarityString } from '~modules/common';

import humanizeTime from '~helpers/humanizeTime';

import { SAUSAGE } from '~constants/corgi';

import { CorgiTypeShape } from '~types/CorgiTypes';

const CorgiCardPropTypes = { corgi: CorgiTypeShape.isRequired };

const CorgiCard = ({ corgi }) => {
  const { id, background_color, color, quote, name, rate, owner, created } = corgi;

  return (
    <div className='corgi-card'>
      <div className='corgi-card__header'>
        <RarityString rate={rate} />
      </div>

      <Link to={`/corgi/${id}`}>
        <div className='corgi-card__image' style={{ backgroundColor: background_color }}>
          <CorgiSVG color={color} sausage={SAUSAGE[rate] || SAUSAGE.COMMON} />
        </div>
      </Link>

      <div className='corgi-card__body'>
        <h5 className='corgi-card__name'>{name}</h5>
        <Quote id={quote} />
      </div>

      <div className='corgi-card__footer'>
        <p className='corgi-card__text'>
          {humanizeTime(created)} ago by <span className='corgi-card__owner'>@{owner}</span>
        </p>
      </div>
    </div>
  );
};

CorgiCard.propTypes = CorgiCardPropTypes;

export default CorgiCard;
