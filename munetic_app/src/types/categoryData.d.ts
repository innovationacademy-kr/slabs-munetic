
/**
 * 카테고리 테이블의 데이터 타입을 정의합니다. 기본키나 외래키 제외 모두 optional로 설정합니다.
 */
export interface ICategoryTable {
  id: number;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
