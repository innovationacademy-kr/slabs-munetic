import { useContext, useEffect } from 'react';
import TopBar from './components/common/TopBar';
import Routing from './Routing';
import GlobalStyle from './style/GlobalStyle';
import BottomMenu from './components/common/BottomMenu';
import Contexts from './context/Contexts';
import loginCheck from './lib/auth/loginCheck';
import Logout from './lib/auth/logout';

function App() {
  const { actions } = useContext(Contexts);
  const isLoggedIn: boolean = Boolean(localStorage.getItem('user'));

  useEffect(() => {
    async function checkLogin() {
      const result = await loginCheck();
      if (!result && isLoggedIn) {
        Logout(); //임의로 로컬스토리지에 user 정보 기입하는 행위 방지
      }
      actions.setLoggedin(isLoggedIn);
    }
    checkLogin();
  }, []);

  return (
    // FIXME: 임시로 글꼴 설정했는데 추후에 바꾸어야 할 듯 합니다. by joohongpark
    <div
      style={{
        fontFamily:
          "font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      }}
    >
      <GlobalStyle />
      <TopBar />
      <Routing />
      <BottomMenu />
    </div>
  );
}

export default App;
