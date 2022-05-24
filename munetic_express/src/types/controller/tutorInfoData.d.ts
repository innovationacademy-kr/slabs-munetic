/**
 * 클라이언트로부터 튜터 정보 데이터를 받거나 전송하는 타입을 정의합니다.
 */
export interface ITutorInfoType {
  spec?: string;
  career?: string;
  youtube?: string;
  instagram?: string;
  soundcloud?: string;
  tutor_introduction?: string;
}

/**
 * 테이블에 컬럼을 삽입할 때 사용되는 인터페이스입니다.
 */
export interface ITutorInfoInsertType {
  user_id: number;
  spec: string;
  career: string;
  youtube: string;
  instagram: string;
  soundcloud: string;
  tutor_introduction: string;
}
