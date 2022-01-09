import CustomGrid from '../components/Grid/CustomGrid';
import { useInfoUpdate } from '../contexts/info';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import * as Api from '../lib/api';

export default function AdminUserInfoPage() {
  const path = useLocation().pathname;
  const setInfo = useInfoUpdate();

  useEffect(() => {
    const userId = parseInt(path.slice(13));
    Api.getUserInfo(userId).then(res => {
      if (setInfo) setInfo(res.data.data);
    });
  }, []);

  return <CustomGrid />;
}
