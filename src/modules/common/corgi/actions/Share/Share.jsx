import React from 'react';

import './Share.scss';

import { InlineShareButtons } from 'sharethis-reactjs';

import { CorgiType } from '~types/CorgiTypes';

const SharePropTypes = { id: CorgiType.id };

const Share = ({ id }) => (
  <div className='share'>
    <InlineShareButtons
      config={{
        display: 'block',
        alignment: 'center',
        color: 'social',
        enabled: true,
        labels: 'cta',
        language: 'en',
        networks: ['telegram', 'linkedin', 'facebook', 'twitter', 'pinterest'],

        url: `${window.location.origin}/corgi/${id}`,
      }}
    />
  </div>
);

Share.propTypes = SharePropTypes;

export default Share;
