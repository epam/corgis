import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { GiDiscussion, GiJumpingDog, GiDogBowl, GiGlassBall } from 'react-icons/gi';

import Button from '../../utils/Button/Button';
import SwitchCorgiPhoto from '../../utils/SwitchCorgiPhoto';

import { CorgiTypeShape } from '../../../types/CorgiTypes';

const ProfileRowPropTypes = {
  corgi: CorgiTypeShape.isRequired,
  deleteCorgi: PropTypes.func.isRequired,
};

const ProfileRow = ({ corgi, deleteCorgi }) => {
  if (!corgi) {
    return <Redirect to='/profile' />;
  }

  const DeleteCorgi = () => {
    deleteCorgi(corgi.id);
  };

  return (
    <div
      style={{
        margin: '5px',
        display: 'flex',
        flexBasis: 'row wrap',
        justifyContent: 'center',
      }}
    >
      <Link
        to={{
          pathname: `/@${corgi.name}`,
          hash: corgi.id,
        }}
        key={corgi.id}
      >
        <SwitchCorgiPhoto rate={corgi.rate} color={corgi.color} />
      </Link>
      <div style={{ marginLeft: '10px', width: '50%', textAlign: 'left' }}>
        <div>
          <GiGlassBall style={{ color: '#9437ff' }} /> {corgi.rate}
          <GiJumpingDog style={{ color: '#9437ff' }} />
          {corgi.name}
          <GiDogBowl style={{ color: '#9437ff' }} />
          from: {corgi.sender.length > 0 ? corgi.sender : 'NEAR'}
          <p>
            <GiDiscussion style={{ color: '#9437ff' }} />
            {corgi.message ? corgi.message : 'This lovely corgi is for you'}
          </p>
          <Button description='^ delete' action={DeleteCorgi} />
        </div>
      </div>
    </div>
  );
};

ProfileRow.propTypes = ProfileRowPropTypes;

export default ProfileRow;
