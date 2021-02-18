import React, { useContext, useEffect } from 'react';

import './HomePage.scss';

import { ContractContext, NearContext } from '~contexts';

import { Poster, ShowCase } from '~modules/home/components';

const HomePage = () => {
  const { user, signIn } = useContext(NearContext);
  const { getDisplayCorgis, displayCorgis } = useContext(ContractContext);

  const requestSignIn = () => {
    signIn();
  };

  useEffect(() => {
    getDisplayCorgis();
  }, [getDisplayCorgis]);

  return (
    <div className='home'>
      <Poster requestSignIn={requestSignIn} user={user} />
      <ShowCase corgis={displayCorgis} />
    </div>
  );
};

export default HomePage;
