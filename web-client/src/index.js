import React from 'react';
import ReactDom from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { BrowserRouter } from 'react-router-dom';
import settings from '../config/settings';
import { AppWithSettings } from './contexts/SettingsContext';
import { MobileApp } from './contexts/MobileContext';
import { LoadingApp } from './contexts/LoadingContext';
import { ThemedApp } from './contexts/ThemeContext';
import { I18NApp } from './contexts/I18NContext';
import { NotificationApp } from './contexts/NotificationContext';
import Application from './application/Application';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({uri: settings.BackendUrl}),
});

ReactDom.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <AppWithSettings>
        <MobileApp>
          <LoadingApp>
            <ThemedApp>
              <I18NApp>
                <NotificationApp>
                  <Application/>
                </NotificationApp>
              </I18NApp>
            </ThemedApp>
          </LoadingApp>
        </MobileApp>
      </AppWithSettings>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
