import { Op } from 'sequelize';
import * as Status from 'http-status';
import { LessonLike } from '../models/lessonLike';
import ErrorResponse from '../modules/errorResponse';
import { Lesson } from '../models/lesson';
import { User } from '../models/user';

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
      user_id,
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
      lesson_id,
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
