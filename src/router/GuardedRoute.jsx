import React from 'react';
import { Route, Redirect, useLocation, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ReactChildrenType } from '~types/ReactChildrenType';

const GuardedRoutePropTypes = {
  children: ReactChildrenType,
  auth: PropTypes.bool.isRequired,
  rest: function (props, propName, componentName) {},
};

const GuardedRoute = ({ children, auth, ...rest }) => (
  <Route {...rest}>{auth === true ? children : <Redirect to='/' />}</Route>
);

GuardedRoute.propTypes = GuardedRoutePropTypes;

export default GuardedRoute;
