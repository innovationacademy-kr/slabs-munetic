import { useState, useContext, useEffect } from 'react';
import * as ProfileAPI from '../lib/api/profile';
import LoggedIn from './home/LoggedIn';
import { Account } from '../types/enums';
import Contexts from '../context/Contexts';

export default function Home() {
  const [userType, setUserType] = useState<Account>(Account.Student);
  const { state } = useContext(Contexts);

  useEffect(() => {
    const getAccountInfo = async () => {
      try {
        const userProfile = await ProfileAPI.getMyProfile();
        setUserType(userProfile.data.data.type);
      } catch (error) {
        console.log(error);
      }
    };
    if (state.loggedin) getAccountInfo();
  }, []);

  return <LoggedIn type={userType} />;
}
