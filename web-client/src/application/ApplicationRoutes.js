import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

export const ProtectedRoute = (props) => {
  const {
    component: RouteComponent,
    canAccess,
    redirectTo = '/login',
    ...rest
  } = props;

  if (!canAccess && redirectTo === '/login') {
    return null;
  }

  return (
    <Route
      {...rest}
      render={renderProps => (canAccess ? <RouteComponent {...renderProps} /> : <Redirect to={redirectTo}/>)}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.any,
  ]),
  canAccess: PropTypes.bool,
  redirectTo: PropTypes.string,
};

export const ContractorsPage = lazy(
  () => import(/* webpackChunkName: "ContractorsPage" */ '../pages/ContractorsPage'),
);

export const SettingsPage = lazy(
  () => import(/* webpackChunkName: "SettingsPage" */ '../pages/SettingsPage'),
);

const ApplicationRoutes = () => {
  return (
    <Suspense fallback={<div/>}>
      <Switch>
        <ProtectedRoute
          exact={true}
          canAccess={true}
          path='/contractors'
          component={ContractorsPage}
        />
        <ProtectedRoute
          exact={true}
          canAccess={true}
          path='/settings'
          component={SettingsPage}
        />
        <Redirect from={'/'} to={'/contractors'}/>
      </Switch>
    </Suspense>
  );
};

ApplicationRoutes.propTypes = {
  authorizedUser: PropTypes.object,
};

export default ApplicationRoutes;
