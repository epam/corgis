import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import Corgi from './Corgi/Corgi';

export const BigCard = ({ backgroundColor, color, quote, sausage }) => (
  <div
    style={{
      backgroundColor,
      borderRadius: '10px',
      padding: '20px',
      width: '86%',
      margin: 'auto',
      maxWidth: '1000px',
    }}
  >
    <BigDialogue quote={quote} color={color} />
    <BigCorgi color={color} sausage={sausage} />
  </div>
);

const BigCorgi = ({ color, sausage }) => (
  <div
    style={{
      width: '90%',
      margin: 'auto',
      maxWidth: '700px',
    }}
  >
    <Corgi color={color} sausage={sausage} />
  </div>
);

const BigDialogue = ({ quote, color }) => (
  <div
    style={{
      position: 'relative',
      top: '40px',
      width: '240px',
      padding: '8px',
      wordWrap: 'breakWord',
      backgroundColor: 'white',
      opacity: '0.7',
      borderRadius: '20px',
      margin: 'auto',
    }}
  >
    <p style={{ color, filter: 'brightness(50%)', margin: '0' }}>
      <FaQuoteLeft size='0.8em' /> {quote}
    </p>
  </div>
);

export const SmallCard = ({ backgroundColor, color, quote, sausage }) => (
  <div
    style={{
      backgroundColor,
      borderRadius: '10px',
      padding: '20px',
      display: 'inline-block',
    }}
  >
    <Dialogue quote={quote} color={color} />
    <Corgi color={color} sausage={sausage} />
  </div>
);

export const Dialogue = ({ quote, color }) => (
  <div
    style={{
      position: 'relative',
      fontSize: '0.5em',
      width: '150px',
      padding: '3px',
      wordWrap: 'break-word',
      backgroundColor: 'white',
      opacity: '0.7',
      borderRadius: '20px',
      left: '25%',
    }}
  >
    <p style={{ color, filter: 'brightness(50%)', margin: '0' }}>
      <FaQuoteLeft size='0.8em' /> {quote}
    </p>
  </div>
);
