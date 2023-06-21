import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider'
import { Provider } from 'react-redux';
import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);