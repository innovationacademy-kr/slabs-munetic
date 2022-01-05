import Menu from './components/Menu/Menu';
import Routing from './components/Routing';
import GlobalStyle from './style/GlobalStyle';
import LoginPage from './pages/LoginPage';
import { useLogin, useLoginUpdate } from './contexts/login';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import * as Api from './lib/api';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const login = useLogin();
  const setLogin = useLoginUpdate();

  useEffect(() => {
    Api.refresh()
      .then(res => {
        Api.instance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${res.data.data}`;
        if (setLogin) setLogin(true);
        setIsLoading(false);
      })
      .catch(err => {
        if (err.respose) alert(err.response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      {isLoading ? (
        <CircularProgress />
      ) : login ? (
        <>
          <Menu />
          <Routing />
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
