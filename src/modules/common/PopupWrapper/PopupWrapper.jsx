import React, { useState, useRef } from 'react';

import './PopupWrapper.scss';

import { useDetectClickOutside } from '~hooks/';

import { Popup } from '~modules/common';

import { PopupTypeShape } from '~types/PopupTypes';
import { ReactChildrenTypeRequired } from '~types/ReactChildrenType';

const PopupWrapperPropTypes = {
  popup: PopupTypeShape,
  children: ReactChildrenTypeRequired,
};

const PopupWrapper = ({ popup = { title: '', position: 'top', children: <></> }, children }) => {
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const togglePopup = () => {
    if (isPopupOpened) {
      setIsPopupOpened(false);
    } else {
      setIsPopupOpened(true);
    }
  };

  const handleClickOutside = () => {
    setIsPopupOpened(false);
  };

  const PopupWrapperRef = useRef(null);

  useDetectClickOutside(PopupWrapperRef, handleClickOutside);

  return (
    <div className='popup-wrapper' ref={PopupWrapperRef}>
      <Popup isOpened={isPopupOpened} title={popup.title} position={popup.position}>
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
