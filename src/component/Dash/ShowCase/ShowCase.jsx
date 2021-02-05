import { Link } from 'react-router-dom';
import React from 'react';

import DashCard from './DashCard/DashCard';

const ShowCase = ({ displayCorgis }) => {
  const Corgis = displayCorgis.map((corgi) => (
    <Link
      to={{
        pathname: '/share',
        hash: corgi.id,
      }}
      key={corgi.id}
    >
      <DashCard corgi={corgi} />
    </Link>
  ));
  return <div>{Corgis}</div>;
};

export default ShowCase;
