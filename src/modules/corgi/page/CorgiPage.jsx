import React, { useContext, useEffect } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';

import './CorgiPage.scss';

import { ContractContext, NearContext } from '~contexts';

import { CorgiActions, CorgiCard, CorgiRate, CorgiSpinner } from '~modules/common';

const CorgiPage = () => {
  const { user } = useContext(NearContext);
  const { corgi, error, loading, getActiveCorgi, deleted, transfered } = useContext(ContractContext);

  const {
    params: { id },
  } = useRouteMatch();

  useEffect(() => {
    if (id) {
      getActiveCorgi(id);
    }
  }, [id, transfered]);

  if (deleted || !id) {
    return <Redirect to={user ? `/user/${user.accountId}` : '/'} />;
  }

  if (loading && !corgi) {
    return <CorgiSpinner />;
  }

  return (
    <div className='corgi-page'>
      {!error && corgi ? (
        <>
          <div className='corgi-page__card'>
            <CorgiCard corgi={corgi} big hideActions />
          </div>

          <div className='corgi-page__content'>
            <CorgiRate rate={corgi.rate} />

            <div className='corgi-page__actions'>
              <CorgiActions corgi={corgi} />
            </div>
          </div>
        </>
      ) : (
        <h1 className='corgi-page__error'>Such Corgi not exist</h1>
      )}
    </div>
  );
};

export default CorgiPage;
