import Menu from './components/Menu';
import Routing from './components/Routing';
import GlobalStyle from './style/GlobalStyle';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <GlobalStyle />
      {isLogin ? (
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
