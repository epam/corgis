import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './CorgiCard.scss';

import { CorgiSVG, Dropdown, Quote, RarityString } from '~modules/common';

import humanizeTime from '~helpers/humanizeTime';

import { SAUSAGE } from '~constants/corgi';

import { CorgiTypeShape } from '~types/CorgiTypes';

const CorgiCardPropTypes = { corgi: CorgiTypeShape.isRequired, showActions: PropTypes.bool };

// const sample = {
//   background_color: '#0a1eff',
//   color: '#d2fc9f',
//   created: 1614018415048601000,
//   id: '9RJfzs3lE+flgHs4iYr/rVGBzqF/gbGxRKITUfx+H2s=',
//   modified: 1614018415048601000,
//   name: 'rambunctious reward',
//   owner: 'hexus.testnet',
//   quote: '59',
//   rate: 'COMMON',
//   sender: '',
// };

const CorgiCard = ({ corgi, showActions = false }) => {
  const { id, background_color, color, quote, name, rate, owner, created } = corgi;

  return (
    <div className='corgi-card'>
      <div className='corgi-card__header'>
        <RarityString rate={rate} />

        {showActions && (
          <Dropdown
            title={
              <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
                <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z' />
              </svg>
            }
            listStyles={{
              left: 'auto',
              right: 0,
            }}
          >
            {/* slug for transfer feature */}
            <span onClick={() => console.log('Gift')}>Gift</span>
            <span onClick={() => console.log('Trade')}>Trade</span>
            <span onClick={() => console.log('Share')}>Share</span>
            <span divider='true'></span>
            <span onClick={() => console.log('Delete')}>Delete</span>
          </Dropdown>
        )}
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
