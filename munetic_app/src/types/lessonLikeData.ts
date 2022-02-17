
/**
 * 댓글 테이블의 데이터 타입을 정의합니다.
 * 
 * @author sungkim
 */
export interface ILessonLikeTable {
    id: number;
    user_id: number;
    lesson_id: number;
    lesson_like: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
