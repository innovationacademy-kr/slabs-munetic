import { FindOptions } from 'sequelize/dist';
import { Category, categoryAttributes } from '../models/category';
import { Lesson, lessonAttributes } from '../models/lesson';
import { User, userAttributes } from '../models/user';
import ErrorResponse from '../modules/errorResponse';
import * as Status from 'http-status';
import { CountRows, LessonAllInfo, LessonEditable } from '../types/service/lesson.service';

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
 * @returns Promise<CountRows<LessonAllInfo>>
 * @author Jonghyun Lim
 * @version 1
 */
export const findLessons = async (
  offset: number,
  limit: number,
  all: boolean,
): Promise<Lesson[]> => {
  const query = all ? lessonQueryOptionsforAdmin : lessonQueryOptions;
  const lessonData = await Lesson.findAndCountAll({
    ...query,
    offset,
    limit,
  });
  return lessonData.rows;
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
