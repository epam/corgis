import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import './SinglePage.scss';

import iconSend from '../../assets/images/icon-send.svg';
import iconShare from '../../assets/images/icon-share.svg';

import { NearContext } from '../../context/NearContext';
import { ContractContext } from '../../context/contract';
import { TransferContextProvider } from '../../context/transfer';

import CorgiCard from '../CorgiCard/CorgiCard';
import SendModal from './SendModal/SendModal';
import ShareModal from './ShareModal/ShareModal';

import Spinner from '../utils/Spinner/Spinner';
import CorgiRate from '../utils/corgiPhotos/CorgiRate';

const SinglePage = () => {
  const { user } = useContext(NearContext);
  const { corgi, loading, getCorgi, transfering } = useContext(ContractContext);

  const [showSend, setSend] = useState(false);
  const [showShare, setShare] = useState(false);

  const { hash } = useLocation();
  const id = !!hash.length ? hash.slice(1) : hash;

  useEffect(() => {
    if (!!id) {
      getCorgi(id);
    }
  }, [getCorgi, id]);

  const openSendModal = () => {
    setSend(true);
  };

  const openShareModal = () => {
    setShare(true);
  };

  const closeModal = () => {
    setSend(false);
    setShare(false);
  };

  if (!user) {
    return <Redirect to='/' />;
  }

  if (!id) {
    return <Redirect to='/account' />;
  }

  if (!corgi || loading) {
    return <Spinner />;
  }

  if (corgi.owner !== user.accountId) {
    return <Redirect to='/account' />;
  }

  return (
    <div className='corgi-page'>
      <TransferContextProvider>
        <SendModal corgi={corgi} transfering={transfering} show={showSend} closeModal={closeModal} />
        <ShareModal corgi={corgi} closeModal={closeModal} show={showShare} />

        <div className='corgi-page__card'>
          <h1>Meet {corgi.name}!</h1>

          <CorgiCard corgi={corgi} size='big' />

          <div className='wrapperS'>
            <CorgiRate rate={corgi.rate} />
            <SendAndShare openSendModal={openSendModal} openShareModal={openShareModal} />
          </div>
        </div>
      </TransferContextProvider>
      <style>{`
        .wrapperS {
          width: 70%;
          max-width: 800px;
          margin: 2% auto;
          display: flex;
          justify-content: space-between;
      }
      
      .card {
          background-color: azure;
          margin: 3%;
          padding: 2%;
          display: flex;
          border-radius: 5px;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
          cursor: pointer;
      }
      
      .cardChar {
          color: #2b73c7;
      }
      
      .text {
          margin-left: 10px;
          display: inline-block;
          width: 200px;
          text-align: left;
          padding: 0;
      }
      
      .small {
          display: none;
      }
      
      @media all and (max-width: 416px) {
          .text {
              display: none;
          }
      
          .small {
              font-size: 1rem;
              display: inline;
              color: #2b73c7;
          }

          .card {
            width: 100px;
          }

          .icontext {
            display: none;
          }
      }
      `}</style>
    </div>
  );
};

const SendAndSharePropTypes = {
  openShareModal: PropTypes.func.isRequired,
  openSendModal: PropTypes.func.isRequired,
};

const SendAndShare = ({ openShareModal, openSendModal }) => {
  const style = { display: 'flex', flexDirection: 'column', width: '300px' };
  return (
    <div>
      <h5 className='icontext'>What would you like to do with </h5>
      <span style={style}>
        <SendCard clicked={openSendModal} />
        <ShareCard clicked={openShareModal} />
      </span>
    </div>
  );
};
SendAndShare.propTypes = SendAndSharePropTypes;

const SendCardPropTypes = { clicked: PropTypes.func.isRequired };

const SendCard = ({ clicked }) => (
  <button className='card' onClick={clicked}>
    <img src={iconSend} alt='Send' style={{ height: '60%', paddingTop: '20px' }} />
    <div className='small'>Send</div>
    <div className='text'>
      <h3 className='cardChar'>Send as a gift</h3>
      <p>The perfect gift for any occasion</p>
    </div>
  </button>
);
SendCard.propTypes = SendCardPropTypes;

const ShareCardPropTypes = { clicked: PropTypes.func.isRequired };

const ShareCard = ({ clicked }) => (
  <button className='card' onClick={clicked}>
    <img src={iconShare} alt='Share' style={{ height: '60%', paddingTop: '20px' }} />
    <div className='small'>Share</div>
    <div className='text'>
      <h3 className='cardChar'>Share on Social</h3>
      <p>Got something rare? It is time to brag a bit.</p>
    </div>
  </button>
);
ShareCard.propTypes = ShareCardPropTypes;

export default SinglePage;
