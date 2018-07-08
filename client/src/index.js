import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider } from '@material-ui/core';
import myTheme from './myTheme';
import Raven from 'raven-js';


// Raven.config('https://b8ff3d1da124437e9a4bb2237d2e4e29@sentry.io/1228705').install()

ReactDOM.render(
  <BrowserRouter>
      <MuiThemeProvider theme={myTheme}>
          <App />
        </MuiThemeProvider>
    </BrowserRouter>, document.getElementById('root'),
);
registerServiceWorker();
