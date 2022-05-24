export interface userSignupData {
  login_id: string;
  login_password: string;
  type: string;
  nickname: string;
  name: string;
  birth: string;
  email: string;
  phone_number: string;
  gender: string | undefined;
}

export interface ITutorInfoType {
  spec: string;
  career: string;
  youtube: string;
  instagram: string;
  soundcloud: string;
  tutor_introduction: string;
}
