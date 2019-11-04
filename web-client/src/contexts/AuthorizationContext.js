import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookies';
import AuthorizationService from '../APIs/AuthorizationAPI';

const AuthorizationContext = React.createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthorizationProvider = AuthorizationContext.Provider;

export const AuthorizationConsumer = AuthorizationContext.Consumer;

const AuthorizationComponent = ({ children, history }) => {
  const [authorizedUser, setAuthorizedUser] = useState(null);
  const [authorizationProcess, setAuthorizationProcessState] = useState(true);
  const authorize = async () => {
    let user = null;
    let error = null;

    try {
      user = await AuthorizationService.authorize();

      setAuthorizedUser(user);
    } catch (e) {
      error = e;
    } finally {
      setAuthorizationProcessState(false);
    }

    return [user, error];
  };

  const signIn = async (...args) => {
    let user = null;
    let error = null;

    try {
      user = await AuthorizationService.signIn(...args);

      setAuthorizedUser(user);
      history.push('');
    } catch (e) {
      error = e;
    } finally {
      setAuthorizationProcessState(false);
    }

    return [user, error];
  };

  const signOut = async (...args) => {
    let user = authorizedUser;
    let error = null;

    try {
      await AuthorizationService.signOut(...args);

      setAuthorizedUser(null);
      user = null;
      history.push('');
    } catch (e) {
      error = e;
    } finally {
      setAuthorizationProcessState(false);
    }

    return [user, error];
  };

  useEffect(() => {
    const authorizationToken = Cookies.getItem('authorizationToken');

    if (authorizationToken) {
      authorize();
    }
  }, []);

  return (
    <AuthorizationProvider value={{
      user: authorizedUser,
      signIn,
      signOut,
      authorize,
    }}>
      {children}
    </AuthorizationProvider>
  );
};

AuthorizationComponent.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object,
};

export const AuthorizedApp = withRouter(AuthorizationComponent);

export default AuthorizationContext;
