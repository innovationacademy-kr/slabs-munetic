import { FindOptions, Op } from 'sequelize';
import * as Status from 'http-status';
import { LessonLike, lessonLikeAttributes } from '../models/lessonLike';
import ErrorResponse from '../modules/errorResponse';
import { Lesson } from '../models/lesson';
import { User } from '../models/user';
import { sequelize } from '../models';

/**
 * user가 좋아요 한 모든 강의 조회
 * 
 * @param user_id user ID
 * @returns Promise<LessonLike[]>
 * @throws ErrorResponse if the user ID is not exists.
 * @author joohongpark
 */
export const searchAllLessonLikes = async (
  user_id: number,
): Promise< LessonLike[] > => {
  const searchLessonLikes = await LessonLike.findAll({
    where: {
      [Op.and]: [
        { user_id },
        { lesson_like: true },
      ]
    },
    include: [
      {
        model: Lesson,
        attributes: {
          exclude: ['id', 'createdAt', 'deletedAt'],
        },
      }
    ],
    attributes: {
      exclude: ['user_id', 'createdAt', 'deletedAt'],
    },
  });
  if (!searchLessonLikes)
    throw new ErrorResponse(Status.BAD_REQUEST, '유효하지 않은 유저 id입니다.');
  return searchLessonLikes;
};

/**
 * 강의에 좋아요를 누른 사람들 목록 리턴
 * 
 * @param user_id user ID
 * @returns Promise<LessonLike[]>
 * @throws ErrorResponse if the user ID is not exists.
 * @author joohongpark
 */
export const getLikedPeoples = async (
  lesson_id: number,
): Promise< LessonLike[] > => {
  const searchLessonLikes = await LessonLike.findAll({
    where: {
      [Op.and]: [
        { lesson_id },
        { lesson_like: true },
      ]
    },
    include: [
      {
        model: User,
        attributes: ['type', 'login_id', 'nickname'],
      }
    ],
    attributes: [],
  });
  if (!searchLessonLikes)
    throw new ErrorResponse(Status.BAD_REQUEST, '유효하지 않은 강의 id입니다.');
  return searchLessonLikes;
};

/**
 * user가 강의에 좋아요 눌렀는지 여부 확인
 * 
 * @param user_id user ID
 * @param lesson_id lesson ID
 * @returns Promise<boolean>
 * @author joohongpark
 */
export const searchLessonLike = async (
  user_id: number,
  lesson_id: number,
): Promise< boolean > => {
  const checkExistence = await LessonLike.findOne({
    where: {
      [Op.and]: [
        { user_id },
        { lesson_id },
        { lesson_like: true },
      ]
    },
  });
  if (!checkExistence) return false;
  return true;
};

/**
 * 강의에 대해 좋아요 체크 또는 해제
 * 
 * @param user_id user ID
 * @param lesson_id lesson ID
 * @param likes like / unlike
 * @returns Promise<LessonLike>
 * @throws ErrorResponse if the user ID or lesson ID is not exists.
 * @author joohongpark
 */
export const setLessonLike = async (
  user_id: number,
  lesson_id: number,
  likes: boolean,
): Promise< boolean > => {
  let rtn: boolean = false;
  try {
    const newLessonLike: [LessonLike, boolean] = await LessonLike.findOrCreate({
      where: {
        [Op.and]: [
          { user_id },
          { lesson_id },
        ]
      },
      defaults: {
        user_id,
        lesson_id,
        lesson_like: likes,
      },
    });
    const check = await newLessonLike[0].update({ lesson_like: likes });
    rtn = check !== null;
  } catch (e) {
    throw new ErrorResponse(Status.BAD_REQUEST, '유효하지 않은 강의 id입니다.');
  }
  return rtn;
};

/**
 * 강사 당 좋아요 개수
 * 
 * @author joohongpark
 */
 export const getLikesByTutor = async (
): Promise< {tutor_id: number, like_count: number}[] > => {
  let rtn: {tutor_id: number, like_count: number}[] = [];
  try {
    let query: FindOptions<lessonLikeAttributes> = {
      attributes: [
        'lesson_id',
        [sequelize.fn('COUNT', sequelize.col('*')), 'likes'],
      ],
      group: ['lesson_id'],
      include: [
        {
          model: Lesson,
          attributes: ['tutor_id'],
        }
      ],
      order: sequelize.col('likes'),
    };
    let result = await LessonLike.findAll(query);
    let map = new Map<number, number>();
    result.forEach(lessonLike => {
      const lesson = lessonLike.get('Lesson') as Lesson;
      const tutor_id = lesson ? lesson.get('tutor_id') as number : 0;
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
    map.forEach( (value, key) => {
      rtn.push({tutor_id: key, like_count: value});
    });
    rtn.sort((a, b) => (b.like_count - a.like_count));
  } catch (e) {
    throw new ErrorResponse(Status.BAD_REQUEST, '에러');
  }
  return rtn;
};
