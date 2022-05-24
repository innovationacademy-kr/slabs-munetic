import { Sequelize, FindOptions, FindAttributeOptions, Op } from 'sequelize';
import Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import { Comment } from '../models/comment';
import { Lesson, lessonAttributes } from '../models/lesson';
import { User } from '../models/user';
import addProperty from '../util/addProperty';
/**
 * user 로그인 id의 모든 댓글 조회
 *
 * @param user_id user login ID
 * @param offset number (optional)
 * @param limit number (optional)
 * @returns Promise<Comment[]>
 * @throws ErrorResponse if the user login ID is not exists.
 * @author joohongpark
 */
export const searchAllCommentsByUserId = async (
  user_id: string,
  offset?: number,
  limit?: number,
): Promise<Comment[]> => {
  const searchUserID = await User.findOne({
    where: {
      login_id: user_id,
    },
  });
  if (!searchUserID)
    throw new ErrorResponse(Status.BAD_REQUEST, '유효하지 않은 유저 id입니다.');
  let query = {
    attributes: {
      exclude: ['user_id', 'createdAt', 'deletedAt'],
    },
    include: [
      {
        model: Lesson,
        attributes: ['id', 'category_id', 'title'],
      },
    ],
  };
  if (offset !== undefined && limit !== undefined) {
    addProperty<number>(query, 'offset', offset);
    addProperty<number>(query, 'limit', limit);
  }
  const searchAllComments = await searchUserID.getComments(query);
  return searchAllComments;
};

/**
 * 모든 댓글 조회
 *
 * @param offset number (optional)
 * @param limit number (optional)
 * @param all boolean (optional)
 * @returns Promise<Comment[]>
 * @throws ErrorResponse if the user login ID is not exists.
 * @author joohongpark
 */
export const searchAllComments = async (
  offset?: number,
  limit?: number,
  all?: boolean,
): Promise<{ count: number; rows: Comment[] }> => {
  let query = {
    include: [
      {
        model: Lesson,
        attributes: ['id', 'category_id', 'title'],
      },
    ],
    raw: true,
  };
  if (offset !== undefined && limit !== undefined) {
    addProperty<number>(query, 'offset', offset);
    addProperty<number>(query, 'limit', limit);
  }
  if (all !== undefined) {
    addProperty<boolean>(query, 'paranoid', !all);
    addProperty<boolean>(query.include[0], 'paranoid', !all);
  }
  console.log(query);
  const searchAllComments = await Comment.findAndCountAll(query);
  return searchAllComments;
};

/**
 * 레슨 id에 대한 모든 댓글 조회
 *
 * @param lesson_id lesson ID
 * @returns Promise<Bookmark>
 * @author joohongpark
 */
export const searchAllCommentsByLessonId = async (
  lesson_id: number,
): Promise<Comment[]> => {
  const searchAllComments = await Comment.findAll({
    where: {
      lesson_id,
    },
    attributes: {
      exclude: ['deletedAt'],
    },
    include: [
      {
        model: User,
        attributes: ['type', 'login_id', 'nickname', 'image_url'],
      },
    ],
  });
  return searchAllComments;
};

/**
 * 레슨에 댓글 추가
 *
 * @param user_id user ID
 * @param lesson_id lesson ID
 * @param comment comment
 * @param stars stars
 * @returns Promise<Comment>
 * @throws ErrorResponse if it fails to register to comment.
 * @author joohongpark
 */
export const addComment = async (
  user_id: number,
  lesson_id: number,
  comment: string,
  stars: number,
): Promise<Comment> => {
  const newComment: Comment = Comment.build({
    user_id,
    lesson_id,
    content: comment,
    stars,
  });
  const rtn = newComment.save().catch(() => {
    throw new ErrorResponse(Status.BAD_REQUEST, '댓글 등록에 실패하였습니다.');
  });
  return rtn;
};

/**
 * 댓글 수정
 *
 * @param comment_id comment ID
 * @param comment comment
 * @param stars stars
 * @returns Promise< boolean >
 * @author joohongpark
 */
export const updateComment = async (
  comment_id: number,
  comment: string,
  stars: number,
): Promise<boolean> => {
  const rtn = await Comment.update(
    {
      content: comment,
      stars,
    },
    {
      where: {
        id: comment_id,
      },
    },
  );
  return rtn[0] > 0;
};

/**
 * user의 댓글을 삭제
 *
 * @param user_id user ID
 * @param comment_id comment ID
 * @returns Promise<boolean>
 * @author joohongpark
 */
export const removeComment = async (
  user_id: number,
  comment_id: number,
): Promise<boolean> => {
  const checkExistence = await Comment.findOne({
    where: {
      [Op.and]: [{ user_id }, { id: comment_id }],
    },
  });
  if (!checkExistence) return false;
  await checkExistence.destroy();
  return true;
};

/**
 * 고유 ID를 통해 댓글들을 삭제
 *
 * @param id 삭제하고자 하는 ID 배열
 * @param force 실제로 테이블에서 삭제하는지 여부
 * @returns Promise<number>
 * @author joohongpark
 */
export const removeComments = async (
  id: number[],
  force?: boolean,
): Promise<number> => {
  let query = {
    where: { id },
  };
  if (force !== undefined) {
    addProperty<boolean>(query, 'force', force);
  }
  const rtn = await Comment.destroy(query);
  return rtn;
};

/**
 * 강사 당 댓글 개수
 *
 * @param offset number (optional)
 * @param limit number (optional)
 * @author joohongpark
 */
export const getCommentCountByTutor = async (
  offset?: number,
  limit?: number,
): Promise<Comment[]> => {
  let rtn: Comment[];
  try {
    let query: {
      attributes: FindAttributeOptions;
      group: string[];
    } = {
      attributes: [
        'lesson_id',
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'likes'],
      ],
      group: ['lesson_id'],
    };
    if (offset !== undefined && limit !== undefined) {
      addProperty<number>(query, 'offset', offset);
      addProperty<number>(query, 'limit', limit);
    }
    rtn = await Comment.findAll(query);
  } catch (e) {
    throw new ErrorResponse(Status.BAD_REQUEST, '에러');
  }
  return rtn;
};

/**
 * 강사 당 댓글 개수
 *
 * @author joohongpark
 */
export const getCommentsCountByTutor = async (): Promise<
  { tutor_id: number; comment_count: number }[]
> => {
  let rtn: { tutor_id: number; comment_count: number }[] = [];
  try {
    let query: FindOptions<lessonAttributes> = {
      attributes: [
        'lesson_id',
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'likes'],
      ],
      group: ['lesson_id'],
      include: [
        {
          model: Lesson,
          attributes: ['tutor_id'],
        },
      ],
      order: Sequelize.col('likes'),
    };
    let result = await Comment.findAll(query);
    let map = new Map<number, number>();
    result.forEach(lessonLike => {
      const lesson = lessonLike.get('Lesson') as Lesson;
      const tutor_id = lesson ? (lesson.get('tutor_id') as number) : 0;
      let likes = lessonLike.get('likes') as number;
      if (tutor_id !== 0) {
        if (map.has(tutor_id)) {
          const val = map.get(tutor_id) || 0;
          map.set(tutor_id, val + likes);
        } else {
          map.set(tutor_id, likes);
        }
      }
    });
    map.forEach((value, key) => {
      rtn.push({ tutor_id: key, comment_count: value });
    });
    rtn.sort((a, b) => b.comment_count - a.comment_count);
    console.log(rtn);
  } catch (e) {
    throw new ErrorResponse(Status.BAD_REQUEST, '에러');
  }
  return rtn;
};
