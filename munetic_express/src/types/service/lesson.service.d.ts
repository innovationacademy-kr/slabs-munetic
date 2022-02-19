import { categoryAttributes } from '../../models/category'
import { userAttributes } from '../../models/user'

/**
 * 레슨이 카테고리, 유저 정보를 포함하고 있는 타입을 정의합니다.
 * 이 타입은 `Lesson.findOne` or `Lesson.findAll` 에서 사용됩니다.
 * 
 * @author Jonghyun Lim
 * @version 1
 */
 export interface LessonAllInfo {
  lesson_id: number;
  tutor_id: number;
  title: string;
  price?: number;
  location?: string;
  minute_per_lesson?: number;
  content?: string;
  Category: categoryAttributes;
  User: userAttributes;
};

/**
 * findAndCountAll의 리턴 타입입니다.
 * 
 * @author Jonghyun Lim
 */
export interface CountRows<T> {
  count: number;
  rows: T[];
}

/**
 * HTTP 요청의 Req Body입니다. 레슨의 수정 가능한 항목들을 나타냅니다.
 * # TODO: 레슨의 수정 뿐만 아니라 추가시에도 동일한 인터페이스가 사용되므로 인터페이스 이름 변경 필요
 * 
 * @author Jonghyun Lim
 * @version 1
 */
export interface LessonEditable {
  tutor_id?: number;
  category_id?: number;
  title?: string;
  price?: number;
  location?: string;
  minute_per_lesson?: number;
  content?: string;
}