import { useState } from 'react';

import BottomMenu from './common/BottomMenu';
import LoggedIn from './home/LoggedIn';
import LoggedOut from './home/LoggedOut';

export default function Home() {
  const loggedUser = localStorage.getItem('user');
  // FIXME: 타입(선생인지 학생인지)도 로컬 저장소에 저장해야 할듯

  return (
    <>
      {loggedUser ? 
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
