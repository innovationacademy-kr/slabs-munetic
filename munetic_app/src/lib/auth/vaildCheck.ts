import * as AuthAPI from '../api/auth';

export default async function vaildCheck<T>(param_name: string, param_value: T, callback: React.Dispatch<React.SetStateAction<boolean>>) {
  if (param_value) {
    try {
      await AuthAPI.isValidInfo(`${param_name}=${param_value}`);
      alert(`사용 가능합니다.`);
      callback(true);
    } catch (e) {
      alert('중복입니다!');
    }
  } else {
    alert(`값을 입력해 주세요!`);
  }
}