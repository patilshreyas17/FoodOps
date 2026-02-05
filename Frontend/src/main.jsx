import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './State/Store/store';
import { LoadingProvider } from './context/LoadingContext.jsx';
import GlobalSpinner from './components/GlobalSpinner/GlobalSpinner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <LoadingProvider>
          <App />
          <GlobalSpinner />
        </LoadingProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
