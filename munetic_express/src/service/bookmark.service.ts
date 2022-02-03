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
export const createBookmark = async (
  user_id: number,
  lesson_id: number,
): Promise< Bookmark > => {
  const newBookmark: Bookmark = Bookmark.build({
    user_id,
    lesson_id,
  });
  const rtn = newBookmark.save().catch(() => {
    throw new ErrorResponse(Status.BAD_REQUEST, '유효하지 않은 유저 id 또는 레슨 id 입니다.');
  });
  return rtn;
};

/**
 * user에 대한 특정 북마크 검색
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
      ]
    },
  });
  if (!checkExistence) return false;
  return true;
};

/**
 * user에 대한 특정 북마크 삭제
 * 
 * @param user_id user ID
 * @param lesson_id lesson ID
 * @returns Promise<boolean>
 * @author joohongpark
 */
export const removeBookmark = async (
  user_id: number,
  lesson_id: number,
): Promise< boolean > => {
  const checkExistence = await Bookmark.findOne({
    where: {
      [Op.and]: [
        { user_id },
        { lesson_id },
      ]
    }
  });
  if (!checkExistence) return false;
  await checkExistence.destroy();
  return true;
};
