import axios from 'axios';

const { VITE_BASE_URL } = import.meta.env;
export const instance = axios.create({
  baseURL: VITE_BASE_URL as string,
  withCredentials: true,
});

interface LoginProps {
  login_id: string;
  login_password: string;
}

interface createUserProps {
  email: string;
  login_password: string;
  name: string;
  type: string;
}

export const login = async (loginInfo: LoginProps) => {
  return await instance.post('admin/auth/login', loginInfo);
};

export const logout = async () => {
  return await instance.get('admin/auth/logout');
};

export const refresh = async () => {
  return await instance.get('admin/auth/refresh');
};

export const doubleCheck = async (query: string) => {
  return await instance.get(`admin/user/check?${query}`);
};

export const createUser = async (userInfo: createUserProps) => {
  return await instance.post('admin/auth/signup', userInfo);
};

export const getAllUserList = async (page: number) => {
  return await instance.get(`user/all?page=${page + 1}`);
};
