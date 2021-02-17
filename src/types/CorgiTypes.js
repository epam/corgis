import PropTypes from 'prop-types';

import { RATES } from '~constants/corgi';

export const CorgiType = {
  id: PropTypes.string,
  name: PropTypes.string,
  quote: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  rate: PropTypes.oneOf([RATES.COMMON, RATES.UNCOMMON, RATES.RARE, RATES.VERY_RARE]),
  sausage: PropTypes.string,
  sender: PropTypes.string,
  message: PropTypes.string,
};

export const CorgiTypeShape = PropTypes.shape(CorgiType);

export const CorgisArrayType = PropTypes.arrayOf(CorgiTypeShape);
