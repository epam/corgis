import React, { useContext, useEffect } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';

import './CorgiPage.scss';

import { ContractContext } from '~contexts';

import { CorgiCard, CorgiRate, CorgiSpinner } from '~modules/common';
import { CorgiActions } from '~modules/corgi/components';

const CorgiPage = () => {
  const { corgi, loading, getCorgi, deleted } = useContext(ContractContext);

  const {
    params: { id },
  } = useRouteMatch();

  useEffect(() => {
    if (id) {
      getCorgi(id);
    }
  }, [id]);

  if (deleted || !id) {
    return <Redirect to='/account' />;
  }

  if (!corgi || loading) {
    return <CorgiSpinner />;
  }

  return (
    <div className='corgi-page'>
      <div className='corgi-page__card'>
        <CorgiCard corgi={corgi} big />
      </div>

      <div className='corgi-page__content'>
        <CorgiRate rate={corgi.rate} />

        <div className='corgi-page__actions'>
          <CorgiActions id={id} />
        </div>
      </div>
    </div>
  );
};

export default CorgiPage;
