import { Account, Gender } from './enums';

export interface UserDataType {
  id: number;
  type: Account;
  login_id: string | null;
  nickname: string;
  name: string;
  name_public: boolean;
  birth: Date;
  gender: Gender;
  email: string | null;
  phone_number: string | null;
  phone_public: boolean;
  image_url: string | null;
  introduction: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
