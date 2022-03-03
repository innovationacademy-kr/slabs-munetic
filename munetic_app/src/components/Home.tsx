import { useState, useEffect } from 'react';
import loginCheck from '../lib/auth/loginCheck';
import Logout from '../lib/auth/logout';

import BottomMenu from './common/BottomMenu';
import LoggedIn from './home/LoggedIn';
import LoggedOut from './home/LoggedOut';

export default function Home() {
  const loggedUser = localStorage.getItem('user');
  // FIXME: 타입(선생인지 학생인지)도 로컬 저장소에 저장해야 할듯
  const [loggedin, setLoggedin] = useState<boolean>(false);

  useEffect(() => {
    async function checkLogin() {
      const result = await loginCheck();
      setLoggedin(result);
      if (!result && loggedUser) {
        Logout();
      }
    }
    checkLogin();
  }, []);

  return (
    <>
      {loggedin ? 
        (
          <>
          <LoggedIn type={"student"} />
          <BottomMenu />
          </>
        ) : (
          <LoggedOut />
        )
      }
    </>
  );
}
