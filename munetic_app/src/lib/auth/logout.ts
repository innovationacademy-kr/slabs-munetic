import * as Auth from '../api/auth';
import client from '../api/client';

export default async function Logout () {
  try {
    localStorage.removeItem('user');
    await Auth.logout();
    client.defaults.headers.common['Authorization'] = '';
  } catch (e) {
    alert("Authorization Error!");
    console.log(e, '로그아웃 실패');
  }
};