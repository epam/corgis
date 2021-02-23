import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './PopupWrapper.scss';

import classNames from 'classnames';

import { ReactChildrenTypeRequired } from '~types/ReactChildrenType';
import { Popup } from '~modules/common';
import { useDetectClickOutside } from '~hooks/';
import { useEffect } from 'react';

const PopupTypeShape = PropTypes.shape({
  title: PropTypes.string,
  children: ReactChildrenTypeRequired,
});

const PopupWrapperPropTypes = {
  popup: PopupTypeShape,
  children: ReactChildrenTypeRequired,
};

const PopupWrapper = ({ popup = { title: '', children: <></> }, children }) => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const togglePopup = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  const handleClickOutside = () => {
    setIsPopupOpened(false);
  };

  const PopupWrapperRef = useRef(null);

  useDetectClickOutside(PopupWrapperRef, handleClickOutside);

  useEffect(() => {
    console.log(isPopupOpened);
  }, [isPopupOpened]);

  return (
    <div className='popup-wrapper' ref={PopupWrapperRef}>
      <Popup isOpened={isPopupOpened} title={popup.title} position='top'>
        {popup.children}
      </Popup>

      <div className='popup-wrapper__content' onClick={() => togglePopup()}>
        {children}
      </div>
    </div>
  );
};

PopupWrapper.propTypes = PopupWrapperPropTypes;

export default PopupWrapper;
