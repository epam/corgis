import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Donation.scss';

import { Input } from '~modules/common';

const DonationPropTypes = {
  label: PropTypes.string,
  afterword: PropTypes.string,
};

const Donation = ({ label = 'Donate', afterword = '' }) => {
  const [nears, setNears] = useState(1);

  const handleNears = (event) => {
    setNears(event.target.value);
  };

  useEffect(() => {
    console.log(nears);
  }, [nears]);

  return (
    <div className='donation'>
      <span className='donation__text'>{label}</span>

      <div className='donation__input'>
        <Input type='number' min={1} value={nears} onChange={handleNears} />
      </div>

      <svg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M13 25.65C11.3 25.65 9.7 25.33 8.2 24.69C6.7 24.05 5.38 23.17 4.24 22.05C3.12 20.91 2.24 19.59 1.6 18.09C0.96 16.59 0.64 14.99 0.64 13.29C0.64 11.57 0.96 9.97 1.6 8.49C2.24 6.99 3.12 5.68 4.24 4.56C5.38 3.42 6.7 2.53 8.2 1.89C9.7 1.25 11.3 0.929998 13 0.929998C14.72 0.929998 16.32 1.25 17.8 1.89C19.3 2.53 20.61 3.42 21.73 4.56C22.87 5.68 23.76 6.99 24.4 8.49C25.04 9.97 25.36 11.57 25.36 13.29C25.36 14.99 25.04 16.59 24.4 18.09C23.76 19.59 22.87 20.91 21.73 22.05C20.61 23.17 19.3 24.05 17.8 24.69C16.32 25.33 14.72 25.65 13 25.65ZM13 23.97C14.48 23.97 15.86 23.7 17.14 23.16C18.44 22.6 19.58 21.83 20.56 20.85C21.54 19.87 22.3 18.74 22.84 17.46C23.4 16.16 23.68 14.77 23.68 13.29C23.68 11.81 23.4 10.43 22.84 9.15C22.3 7.85 21.54 6.71 20.56 5.73C19.58 4.75 18.44 3.99 17.14 3.45C15.86 2.89 14.48 2.61 13 2.61C11.52 2.61 10.13 2.89 8.83 3.45C7.55 3.99 6.42 4.75 5.44 5.73C4.46 6.71 3.69 7.85 3.13 9.15C2.59 10.43 2.32 11.81 2.32 13.29C2.32 14.77 2.59 16.16 3.13 17.46C3.69 18.74 4.46 19.87 5.44 20.85C6.42 21.83 7.55 22.6 8.83 23.16C10.13 23.7 11.52 23.97 13 23.97ZM7.81 19.62V6.78H10L16.27 16.68C16.27 16.28 16.26 15.89 16.24 15.51C16.22 15.11 16.21 14.72 16.21 14.34V6.78H18.19V19.62H16L9.73 9.69C9.73 10.09 9.74 10.5 9.76 10.92C9.78 11.32 9.79 11.72 9.79 12.12V19.62H7.81Z'
          fill='black'
        />
      </svg>

      {afterword && afterword.length && <span className='donation__text'>{afterword}</span>}
    </div>
  );
};

export default Donation;