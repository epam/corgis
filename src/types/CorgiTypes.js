import PropTypes from 'prop-types';

import { RATES } from '~constants/corgi';

export const CorgiType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  background_color: PropTypes.string.isRequired,
  rate: PropTypes.oneOf([RATES.COMMON, RATES.UNCOMMON, RATES.RARE, RATES.VERY_RARE]).isRequired,
  owner: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
  modified: PropTypes.number.isRequired,
};

export const CorgiTypeShape = PropTypes.shape(CorgiType);

export const CorgisArrayType = PropTypes.arrayOf(CorgiTypeShape);
