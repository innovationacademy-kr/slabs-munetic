import { Account, Gender } from './enums';

/**
 * 유저 테이블의 데이터 타입을 정의합니다. 기본키나 외래키 제외 모두 optional로 설정합니다.
 */
 export interface IUserTable {
  id: number;
  type?: Account;
  login_id?: string | null;
  login_password?: string | null;
  nickname?: string;
  name?: string;
  name_public?: boolean;
  birth?: Date;
  gender?: Gender;
  email?: string | null;
  phone_number?: string | null;
  phone_public?: boolean;
  image_url?: string;
  introduction?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
