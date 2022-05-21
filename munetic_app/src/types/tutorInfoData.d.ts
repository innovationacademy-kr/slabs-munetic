/**
 * 튜터의 추가 정보를 정의합니다. 기본키나 외래키 제외 모두 optional로 설정합니다.
 */
export interface ITutorInfoTable {
  id: number;
  user_id: number;
  spec?: string;
  career?: string;
  youtube?: string;
  instagram?: string;
  soundcloud?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * 튜터의 추가 정보 중 필요한 정보만 정의합니다.
 */
export interface ITutorInfoData {
  spec?: string;
  career?: string;
  youtube?: string;
  instagram?: string;
  soundcloud?: string;
  tutor_introduction?: string;
}
