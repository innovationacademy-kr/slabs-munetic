import CustomGrid from '../components/Grid/CustomGrid';
import { useUserUpdate } from '../contexts/user';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import * as Api from '../lib/api';

export default function UserInfoPage() {
  const path = useLocation().pathname;
  const setUser = useUserUpdate();

  useEffect(() => {
    const userId = parseInt(path.slice(7), 10);
    Api.getUserInfo(userId).then(res => {
      if (setUser) setUser(res.data.data);
    });
  }, []);

  return <CustomGrid />;
}
