import * as Auth from '../api/auth';

export default async function loginCheck (): Promise<boolean> {
  let rtn = false;
  try {
    const res = await Auth.loginCheck();
    rtn = res.data.data as boolean;
  } catch (e) {
    console.log(e, 'err');
  }
  return rtn;
};