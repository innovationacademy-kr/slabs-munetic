
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

/**
 * 좋아요 많은 강사의 타입을 지정합니다.
 * 
 * @author joohongpark
 */
export interface ILikesPerTutorTable {
  tutor_id: number,
  like_count: number,
}
