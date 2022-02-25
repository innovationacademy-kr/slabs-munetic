import { ICategoryTable } from './categoryData';
import { IUserTable } from './userData';
import { ICommentTable } from './commentData';
import { ILessonLikeTable } from './lessonLikeData';

/**
 * 레슨 테이블의 데이터 타입을 정의합니다. 기본키나 외래키 제외 모두 optional로 설정합니다.
 */
export interface ILessonTable {
  id: number;
  tutor_id: number;
  category_id: number;
  title?: string | null;
  price?: number | null;
  location?: string | null;
  minute_per_lesson?: number | null;
  content?: string | null;
  youtube?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * 레슨 테이블 외 카테고리, 강사 정보를 연관하여 가져올 때의 데이터 타입입니다.
 */
export interface ILessonData extends ILessonTable {
  Category: ICategoryTable;
  User: IUserTable;
  Comments: ICommentTable[];
  LessonLikes: ILessonLikeTable[];
  CommentsCount?: number;
  LessonLikesCount?: number;
}
