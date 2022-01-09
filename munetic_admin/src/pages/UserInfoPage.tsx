import InfoGrid from '../components/Info/InfoGrid';
import { useInfoUpdate } from '../contexts/info';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import * as Api from '../lib/api';

export default function UserInfoPage() {
  const path = useLocation().pathname;
  const setInfo = useInfoUpdate();

  useEffect(() => {
    const userId = parseInt(path.slice(7), 10);
    Api.getUserInfo(userId).then(res => {
      if (setInfo) setInfo(res.data.data);
    });
  }, []);

  return <InfoGrid />;
}
