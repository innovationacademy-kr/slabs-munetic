import { Sequelize, Op, FindOptions } from 'sequelize';
import { Category, categoryAttributes } from '../models/category';
import { Lesson, lessonAttributes } from '../models/lesson';
import { User, userAttributes } from '../models/user';
import ErrorResponse from '../modules/errorResponse';
import * as Status from 'http-status';
import { CountRows, LessonAllInfo, LessonEditable } from '../types/service/lesson.service';

import { Comment } from '../models/comment';
import { LessonLike } from '../models/lessonLike';
import addProperty from '../util/addProperty';
import { router } from '../routes';
import * as LessonMapper from '../mapping/LessonMapper';

/**
 * 레슨의 모든 정보 (유저, 카테고리를 포함한 정보) 를 가져올 때 사용하는 쿼리 옵션입니다.
 * 
 * @author Jonghyun Lim
 * @version 1
 */
const lessonQueryOptions: FindOptions<lessonAttributes> = {
  attributes: [
    'id',
    'tutor_id',
    'title',
    'price',
    'location',
    'minute_per_lesson',
    'content',
    'youtube',
    'updatedAt'
  ],
  include: [
    { model: Category, attributes: ['name'] },
    {
      model: User,
      attributes: [
        'login_id',
        'name',
        'nickname',
        'name_public',
        'phone_number',
        'birth',
        'gender',
        'image_url',
      ],
    },
  ],
  order: [
    ['updatedAt', 'DESC'],
  ],
};

/**
 * 레슨의 모든 정보 (유저, 카테고리를 포함한 정보) 를 가져올 때 사용하는 쿼리 옵션입니다.
 * 이 쿼리문은 삭제된 정보까지 조회합니다.
 * 
 * @author Jonghyun Lim
 * @version 1
 */
const lessonQueryOptionsforAdmin: FindOptions = {
  include: [
    { model: Category, attributes: ['name'] },
    {
      model: User,
      attributes: [
        'login_id',
        'name',
        'nickname',
        'name_public',
        'phone_number',
        'birth',
        'gender',
        'image_url',
      ],
      paranoid: false,
    },
  ],
  paranoid: false,
  raw: true,
};

/**
 * 데이터베이스에 레슨 정보를 삽입합니다.
 *
 * @param tutorId 레슨을 등록한 튜터의 테이블 ID입니다.
 * @param lessonEditable 수정 가능한 레슨 정보 객체입니다.
 * @returns Promise<Lesson>
 * @throws ErrorResponse 해당되는 카테고리, 튜터가 없거나 기타 이유로 실패할 경우
 * @author Jonghyun Lim
 * @version 1
 */
export const createLesson = async (
  tutorId: number,
  lessonEditable: LessonEditable,
): Promise<Lesson> => {
  const newLesson = Lesson.build({
    tutor_id: tutorId,
    ...lessonEditable as any, // NOTE: any 키워드를 사용하지 않는 방법 강구
  });
  const rtn = newLesson.save().catch(() => {
    throw new ErrorResponse(Status.BAD_REQUEST, '레슨 등록에 실패했습니다.');
  });
  return rtn;
};

/**
 * 레슨 ID에 대한 레슨을 가져옵니다.
 *
 * @param lessonId Lesson id for finding a lesson
 * @param all boolean 삭제된 정보도 가져옴 (운영자용)
 * @throws ErrorResponse 레슨 ID에 대한 레슨이 존재하지 않을 경우
 * @author Jonghyun Lim
 * @version 1
 */
export const findLessonById = async (
  lessonId: number,
  all: boolean,
): Promise<Lesson> => {
  const query = all ? lessonQueryOptionsforAdmin : lessonQueryOptions;
  const lesson = await Lesson.findOne({
    ...query,
    where: { id: lessonId },
  });
  if (!lesson)
    throw new ErrorResponse(Status.BAD_REQUEST, '유효하지 않은 유저 id입니다.');
  return lesson;
};

/**
 * offset만큼 스킵하여 limit만큼의 레슨 정보들을 받아옵니다.
 * 
 * @param offset number
 * @param limit number
 * @param all boolean 삭제된 정보도 가져옴 (운영자용)
 * @returns Promise<>
 * @author Jonghyun Lim
 * @version 2
 */
export const findLessons = async (
  offset: number,
  limit: number,
  all: boolean,
  category_id?: number,
): Promise<{rows: LessonAllInfo[], count: number}> => {
  const _query = all ? lessonQueryOptionsforAdmin : lessonQueryOptions;
  const query = {
    ..._query,
    offset,
    limit,
  };
  if (category_id !== undefined || category_id !== 0) {
    const where = { category_id };
    addProperty<Object>(query, 'where', where);
  }
  const {rows, count} = await Lesson.findAndCountAll(query);

  const rows_new = await Promise.all( rows.map(async row => {
    const comments = await row.getComments({
      attributes: [[Sequelize.fn('COUNT', '*'), 'cnt']],
    });
    const likes = await row.getLessonLikes({
      attributes: [[Sequelize.fn('COUNT', '*'), 'cnt']],
      where: {
        lesson_like: 1,
      }
    });
    const CommentsCount = comments[0].get('cnt') as number;
    const LessonLikesCount = likes[0].get('cnt') as number;
    return LessonMapper.toLessonAllInfo(row, CommentsCount, LessonLikesCount);
  }));
  return {rows: rows_new, count};
};

/**
 * 레슨 ID에 대한 레슨 정보를 수정합니다.
 *
 * @param lessonId 수정하고자 하는 레슨 ID
 * @param lessonEditable 수정하고자 하는 정보
 * @returns Promise<boolean> 수정 여부
 * @author Jonghyun Lim
 * @version 1
 */
export const editLesson = async (
  lessonId: number,
  lessonEditable: LessonEditable,
): Promise<boolean> => {
  const [updatedNum] = await Lesson.update(
    { ...lessonEditable },
    {
      where: {
        id: lessonId,
      },
    },
  );
  return updatedNum > 0;
};

/**
 * 레슨 ID에 대한 레슨을 삭제합니다.
 *
 * @param lessonId 삭제하고자 하는 레슨 ID
 * @returns Promise<boolean> 삭제 여부
 * @author Jonghyun Lim
 * @version 1
 */
export const removeLesson = async (
  lessonId: number,
): Promise< boolean > => {
  const checkExistence = await Lesson.findOne({
    where: { id: lessonId },
  });
  if (!checkExistence) return false;
  await checkExistence.destroy();
  return true;
};

/**
 * 특정 유저가 작성한 레슨을 가져옵니다.
 *
 * @param userId 유저 ID
 * @param offset number
 * @param limit number
 * @param all boolean 삭제된 정보도 가져옴 (운영자용)
 * @returns Promise<Lesson[]> 레슨 객체
 * @author Jonghyun Lim
 * @version 1
 */
export const findLessonsByUserId = async (
  userId: number,
  offset: number,
  limit: number,
  all: boolean,
): Promise<Lesson[]> => {
  const query = all ? lessonQueryOptionsforAdmin : lessonQueryOptions;
  const lessonData = await Lesson.findAndCountAll({
    ...query,
    where: { tutor_id: userId },
    offset,
    limit,
  });
  return lessonData.rows;
};

/**
 * 튜터가 해당 카테고리에 쓴 글이 있는 지 확인하는 메소드.
 * 이미 해당 카테고리에 글이 존재한다면, true를 반환. 없다면 false를 반환.
 * But, 글의 수정의 경우를 생각해서 arrLessonId와 lessonId가 같은 경우에는 false를 반환.
 * 
 * @param userId 유저 ID
 * @param categoryId 카테고리 ID
 * @param lessonId 레슨 ID
 * @returns Promise<boolean>
 * @author sungkim
 */
export const checkLessonWithUserId = async (
  userId: number,
  categoryId: number,
  lessonId: number,
) : Promise<boolean> => {
  
  const lessonData = await Lesson.findAndCountAll({
    where: {
      tutor_id: userId,
      category_id: categoryId,
    }
  })
  
  let arrLessonId: number = -1;

  lessonData.rows.map((arr: Lesson) => {
    arrLessonId = arr.id;
  })
  if (arrLessonId === lessonId)
    return false;
  if (lessonData.count)
    return true;
  return false;
}

/**
 * 글 끌어올리기 기능을 수행하기 위한 메소드입니다.
 * 이때 쿨타임 60분이 있기 때문에 그에 대한 제한을 time_diff_min으로 체크합니다.
 * 
 * @param lessonId 레슨 ID
 * @returns Promise<boolean>
 * @author sungkim
 */
export const updateLessonOrderByButton = async (
  lessonId: number,
) : Promise<boolean> => {

  const checkCompleted = await Lesson.findOne({where: {id: lessonId,}});

  let now = new Date();
  now.setHours(now.getHours() + 9);
  let updatedTime = new Date(checkCompleted?.updatedAt.toString() || "");
  let time_diff_min = (Number(now) - Number(updatedTime)) / 1000 / 60;

  if (time_diff_min < 60)
    throw new ErrorResponse(Status.BAD_REQUEST, '쿨타임이 남아있습니다.');

  checkCompleted?.changed('updatedAt', true);
  checkCompleted?.save();

  if (checkCompleted)
    return true;
  return false;
}

/**
 * 고유 ID를 통해 레슨들을 삭제
 * 
 * @param id 삭제하고자 하는 ID 배열
 * @param force 실제로 테이블에서 삭제하는지 여부
 * @returns Promise<number>
 * @author joohongpark
 */
 export const removeLessons = async (
  id: number[],
  force?: boolean,
): Promise< number > => {
  let query = {
    where: { id }
  };
  if (force !== undefined) {
    addProperty<boolean>(query, 'force', force);
  }
  const rtn = await Lesson.destroy(query);
  return rtn;
};


/**
 * 조건에 따라 레슨 정보들을 받아옵니다.
 * 
 * @param offset number
 * @param limit number
 * @param all boolean 삭제된 정보도 가져옴 (운영자용)
 * @returns Promise<>
 * @author Jonghyun Lim
 * @version 2
 */
export const findLessonsBySomething = async (
  instrument_id?: number,
  tutor_id?: number,
  location_name?: string,
): Promise<{rows: LessonAllInfo[]}> => {
  const _query = lessonQueryOptions;
  const query = {
    ..._query,
  };
  if (instrument_id !== undefined && instrument_id !== -1) {
    const where = { category_id: instrument_id };
    addProperty<Object>(query, 'where', where);
  }
  if (tutor_id !== undefined && tutor_id !== -1) {
    const where = { tutor_id };
    addProperty<Object>(query, 'where', where);
  }
  if (location_name !== undefined && location_name !== "") {
    const where = { location: {
      [Op.like]: '%' + location_name + '%',
    }};
    addProperty<Object>(query, 'where', where);
  }

  const rows = await Lesson.findAll(query);

  const rows_new = await Promise.all(rows.map(async row => {
    const comments = await row.getComments({
      attributes: [[Sequelize.fn('COUNT', '*'), 'cnt']],
    });
    const likes = await row.getLessonLikes({
      attributes: [[Sequelize.fn('COUNT', '*'), 'cnt']],
      where: {
        lesson_like: 1,
      }
    });
    const CommentsCount = comments[0].get('cnt') as number;
    const LessonLikesCount = likes[0].get('cnt') as number;
    return LessonMapper.toLessonAllInfo(row, CommentsCount, LessonLikesCount);
  }));
  return {rows: rows_new};
};

