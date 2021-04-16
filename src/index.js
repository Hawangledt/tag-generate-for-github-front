import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react'

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-rawan.us.auth0.com"
      clientId="Gsx2rxJAhR0UfPUJ4EkFVboeeVlHTuWM"
      redirectUri={window.location.origin}
      audience="https://tag-generate-for-github.com/"
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
