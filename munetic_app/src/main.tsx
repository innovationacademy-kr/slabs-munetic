import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContextProvider } from './context/Contexts';
import * as Auth from './lib/api/auth';
import client from './lib/api/client';

async function loadUser() {
  try {
    const loggedUser = localStorage.getItem('user');
    if (!loggedUser) {
      return;
    }
    try {
      const res = await Auth.refresh();
      const { data: accessToken } = res.data;
      client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } catch (e) {
      console.log(e, '로그인을 유지하지 못했습니다.');
    }
  } catch (e) {
    console.log(e, 'localStorage is not working');
  }
}

loadUser();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
