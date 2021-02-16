import React from 'react';
import PropTypes from 'prop-types';

import './InfoTile.scss';

const InfoTilePropTypes = { text: PropTypes.string.isRequired };

const InfoTile = ({ text }) => <p className='infotile'>{text}</p>;

InfoTile.propTypes = InfoTilePropTypes;

export default InfoTile;
