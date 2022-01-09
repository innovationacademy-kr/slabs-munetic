import axios from 'axios';

const { VITE_BASE_URL } = import.meta.env;
export const instance = axios.create({
  baseURL: `${VITE_BASE_URL as string}/admin`,
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

interface editUserProps {
  type?: string;
  password?: string;
  nickname?: string;
  name?: string;
  birth?: string;
}

export const login = async (loginInfo: LoginProps) => {
  return await instance.post('auth/login', loginInfo);
};

export const logout = async () => {
  return await instance.get('auth/logout');
};

export const refresh = async () => {
  return await instance.get('auth/refresh');
};

export const doubleCheck = async (query: string) => {
  return await instance.get(`user/check?${query}`);
};

export const createUser = async (userInfo: createUserProps) => {
  return await instance.post('auth/signup', userInfo);
};

export const getAppUserList = async (page: number) => {
  return await instance.get(`user/app?page=${page + 1}`);
};

export const getAdminUserList = async (page: number) => {
  return await instance.get(`user/admin?page=${page + 1}`);
};

export const getUserInfo = async (userId: number) => {
  return await instance.get(`user/${userId}`);
};

export const updateUserInfo = async (
  userId: number,
  userInfo: editUserProps,
) => {
  return await instance.patch(`user/${userId}`, userInfo);
};

export const deleteUser = async (userId: number) => {
  return await instance.delete(`user/${userId}`);
};

export const getAllLessons = async (offset: number, limit: number) => {
  return await instance.get(`lesson?offset=${offset}&limit=${limit}`);
};

export const getUserLessons = async (
  userId: number,
  offset: number,
  limit: number,
) => {
  return await instance.get(
    `lesson/user/${userId}?offset=${offset}&limit=${limit}`,
  );
};
export const getLesson = async (lessonId: number) => {
  return await instance.get(`lesson/${lessonId}`);
};
export const deleteLesson = async (lessonId: number) => {
  return await instance.delete(`lesson/${lessonId}`);
};
