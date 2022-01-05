import client from './client';

export interface NewProfileInfoType {
  type?: string;
  nickname?: string;
  name_public?: boolean;
  phone_public?: boolean;
  image_url?: string | null;
  introduction?: string | null;
}
export const updateProfile = (body: NewProfileInfoType) =>
  client.patch('/api/user', body);
export const getProfileById = (id: number) => client.get(`/api/user/${id}`);
export const getMyProfile = () => client.get('/api/user');
