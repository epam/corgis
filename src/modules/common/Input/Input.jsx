import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

import classNames from 'classnames';

const InputPropTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  showError: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'url']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const Input = ({ error = '', onChange = () => {}, showError = false, type = 'text', value = '', required = false }) => (
  <div className='input'>
    <input
      className='input__field'
      type={type}
      value={value}
      onChange={(event) => onChange(event)}
      required={required}
    />
    <div className={classNames('input__error', { 'input__error--show': showError && error.length })}>{error}</div>
  </div>
);

Input.propTypes = InputPropTypes;

export default Input;
