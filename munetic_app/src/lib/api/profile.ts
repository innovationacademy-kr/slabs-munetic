import client from './client';

export interface NewProfileInfoType {
  type?: string;
  nickname?: string;
  name_public?: boolean;
  phone_public?: boolean;
  image_url?: string | null;
  introduction?: string | null;
}

export interface NewTutorProfileInfoType {
  spec?: string;
  career?: string;
  youtube?: string;
  instagram?: string;
  soundcloud?: string;
  tutor_introduction?: string;
}

export interface forEditTutorProfileInfoType {
  spec?: string;
  career?: string[];
  youtube?: string;
  instagram?: string;
  soundcloud?: string;
  tutor_introduction?: string;
}

export const updateProfile = (body: NewProfileInfoType) =>
  client.patch('/user', body);
export const getProfileById = (id: number) => client.get(`/user/${id}`);
export const getMyProfile = () => client.get('/user');
export const createProfileImg = (body: FormData) =>
  client.post('/user/image', body);
export const getTutorProfileById = (id: number) =>
  client.get(`/user/tutor/${id}`);
export const updateTutorProfile = (body: NewTutorProfileInfoType, id: number) =>
  client.patch(`/user/tutor`, body);
