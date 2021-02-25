import React from 'react';
import { Link } from 'react-router-dom';

import { CorgiType } from '~types/CorgiTypes';
import { ReactChildrenTypeRequired } from '~types/ReactChildrenType';

const CorgiLinkPropTypes = { corgi: CorgiType.id, children: ReactChildrenTypeRequired };

const CorgiLink = ({ id }) => {
  return <Link to={`/corgi/${id}`}>{children}</Link>;
};

CorgiLink.propTypes = CorgiLinkPropTypes;

export default CorgiLink;
