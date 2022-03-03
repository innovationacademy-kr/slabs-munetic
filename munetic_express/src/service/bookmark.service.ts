import { Op } from 'sequelize';
import * as Status from 'http-status';
import { Bookmark } from '../models/bookmark';
import ErrorResponse from '../modules/errorResponse';
import { Lesson } from '../models/lesson';

/**
 * user의 모든 북마크 조회
 * 
 * @param user_id user ID
 * @returns Promise<Bookmark[]>
 * @throws ErrorResponse if the user ID is not exists.
 * @author joohongpark
 */
export const searchAllBookmarks = async (
  user_id: number,
): Promise< Bookmark[] > => {
  const searchBookmarks = await Bookmark.findAll({
    where: {
      [Op.and]: [
        { user_id },
        { lesson_bookmark: true },
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
  if (!searchBookmarks)
    throw new ErrorResponse(Status.BAD_REQUEST, '유효하지 않은 유저 id입니다.');
  return searchBookmarks;
};

/**
 * user에 대한 북마크 저장
 * 
 * @param user_id user ID
 * @param lesson_id lesson ID
 * @returns Promise<Bookmark>
 * @throws ErrorResponse if the user ID or lesson ID is not exists.
 * @author joohongpark
 */
export const setBookmark = async (
  user_id: number,
  lesson_id: number,
  lesson_bookmark: boolean,
): Promise< boolean > => {
  let rtn: boolean = false;
  try {
    const newBookmark: [Bookmark, boolean] = await Bookmark.findOrCreate({
      where: {
        [Op.and]: [
          { user_id },
          { lesson_id },
        ]
      },
      defaults: {
        user_id,
        lesson_id,
        lesson_bookmark,
      },
    });
    const check = await newBookmark[0].update({ lesson_bookmark });
    rtn = check !== null;
  } catch (e) {
    throw new ErrorResponse(Status.BAD_REQUEST, '유효하지 않은 강의 id입니다.');
  }
  return rtn;
};

/**
 * user가 강의에 북마크 눌렀는지 여부 확인
 * 
 * @param user_id user ID
 * @param lesson_id lesson ID
 * @returns Promise<boolean>
 * @author joohongpark
 */
export const searchBookmark = async (
  user_id: number,
  lesson_id: number,
): Promise< boolean > => {
  const checkExistence = await Bookmark.findOne({
    where: {
      [Op.and]: [
        { user_id },
        { lesson_id },
        { lesson_bookmark: true },
      ]
    },
  });
  if (!checkExistence) return false;
  return true;
};
