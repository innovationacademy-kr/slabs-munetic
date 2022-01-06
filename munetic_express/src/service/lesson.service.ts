import { FindOptions } from 'sequelize/dist';
import { Category, categoryAttributes } from '../models/category';
import { Lesson, lessonAttributes } from '../models/lesson';
import { User, userAttributes } from '../models/user';

/**
 * findAndCountAll의 리턴 타입입니다.
 */
export interface CountRows<T> {
  count: number;
  rows: T[];
}

/**
 * Request body of post, patch of /api/lesson. These are editable value of lesson
 */
export interface LessonEditable {
  category?: string;
  title?: string;
  price?: number;
  location?: string;
  minute_per_lesson?: number;
  content?: string;
}

/**
 * All information of Lesson including Category and User data.
 * this is gotten by `Lesson.findOne` or `Lesson.findAll`
 */
export type LessonAllInfo = {
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
 * Query option of 'find Lesson' to get all information about a lesson
 */
const lessonQueryOptions: FindOptions<lessonAttributes> = {
  attributes: [
    ['id', 'lesson_id'],
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
 *  put a lesson row in the database. In case of failure, string is returned
 *
 * @param tutorId Id of a tutor which will be the owner of the lesson
 * @param lessonEditable Lesson information which will be the Lesson object
 * @returns Lesson information which is created
 */
export const createLesson = async (
  tutorId: number,
  lessonEditable: LessonEditable,
): Promise<LessonAllInfo | string> => {
  const tutor = await User.findOne({
    where: {
      id: tutorId,
    },
  });
  if (tutor === null) return '해당하는 튜터가 없습니다.';
  const category = await Category.findOne({
    where: {
      name: lessonEditable.category,
    },
  });
  if (category === null) return '해당하는 카테고리 이름이 없습니다.';

  const categoryLess = { ...lessonEditable } as any;
  categoryLess.category = undefined;

  const newLesson = await Lesson.create({
    ...categoryLess,
    tutor_id: tutorId,
    category_id: category.id,
  });
  newLesson.save();

  const lesson = (await Lesson.findOne({
    ...lessonQueryOptions,
    where: { id: newLesson.id },
  })) as LessonAllInfo | null;
  if (lesson === null) throw new Error('레슨 등록에 실패했습니다.');
  lesson.lesson_id = (lesson as any).dataValues.lesson_id; // 왠지 모르겠지만 바로 들어가지 않음. User와의 property 차이일까?
  return lesson;
};

/**
 * Get lesson information by a lesson id
 *
 * @param lessonId Lesson id for finding a lesson
 * @returns A lesson corresponding to the `lessonId`. If there's no corresponding lesson, string is returned
 */
export const findLesson = async (
  lessonId: number,
): Promise<LessonAllInfo | string> => {
  const lesson = (await Lesson.findOne({
    ...lessonQueryOptions,
    where: { id: lessonId },
  })) as unknown as LessonAllInfo | null;
  if (lesson === null) return '해당하는 레슨이 없습니다.';
  lesson.lesson_id = (lesson as any).dataValues.lesson_id;
  return lesson;
};

/**
 * offset만큼 스킵하여 limit만큼의 레슨 정보들을 받아옵니다. 순서는 기본 순서인 생성 순입니다.
 * deletede된 게시물은 제외
 * @param offset
 * @param limit
 * @returns
 */
export const findLessons = async (
  offset: number,
  limit: number,
): Promise<CountRows<LessonAllInfo> | string> => {
  if (offset < 0 || limit < 0)
    return 'offset이나 limit 값으로 음수가 올 수 없습니다.';
  const lessonData = (await Lesson.findAndCountAll({
    ...lessonQueryOptions,
    offset,
    limit,
  })) as CountRows<unknown> as CountRows<LessonAllInfo>;
  for (const lesson of lessonData.rows) {
    lesson.lesson_id = (lesson as any).dataValues.lesson_id;
  }
  return lessonData;
};

/**
 * Edit lesson information of a lesson id only present in lessonInfo. In case of failure, string is returned
 *
 * @param lessonId Id of a lesson to be editted
 * @param lessonEditable partial information of lesson which will be inserted
 * @returns The edited lesson
 */
export const editLesson = async (
  lessonId: number,
  lessonEditable: LessonEditable,
): Promise<LessonAllInfo | string> => {
  let category;
  if (lessonEditable.category) {
    category = await Category.findOne({
      attributes: ['id'],
      where: { name: lessonEditable.category },
    });
    console.log(lessonEditable.category);
    if (category === null) return '해당하는 카테고리 이름이 없습니다.';
  }
  const [updatedNum] = await Lesson.update(
    { ...lessonEditable, category_id: category?.id },
    {
      where: {
        id: lessonId,
      },
    },
  );
  if (updatedNum === 0) return '해당하는 레슨이 없습니다.';
  console.assert(updatedNum === 1);

  const updatedLesson = (await Lesson.findOne({
    ...lessonQueryOptions,
    where: { id: lessonId },
  })) as LessonAllInfo | null;
  if (updatedLesson === null) throw new Error('레슨 업데이트에 실패했습니다.');

  updatedLesson.lesson_id = (updatedLesson as any).dataValues.lesson_id; // 이유를 알 수 없다.
  return updatedLesson;
};

/**
 * Delete a lesson by lesson id.
 *
 * @param lessonId Lesson id to be deleted
 * @returns Whether the lesson is deleted or not. If there is no corresponding lesson, returns false
 */
export const removeLesson = async (
  lessonId: number,
): Promise<{ removed: boolean } | string> => {
  const checkExistence = await Lesson.findOne({
    where: { id: lessonId },
  });
  if (!checkExistence) return '해당하는 레슨이 없습니다.';

  await checkExistence.destroy();
  return { removed: true };
};

/**
 * 특정 유저가 작성한 레슨을 가져옵니다.
 *
 * @param userId
 */
export const findLessonsByUserId = async (
  userId: number,
  offset: number,
  limit: number,
): Promise<CountRows<LessonAllInfo> | string> => {
  const lessonData = (await Lesson.findAndCountAll({
    ...lessonQueryOptions,
    where: { tutor_id: userId },
    offset,
    limit,
  })) as CountRows<unknown> | null as CountRows<LessonAllInfo> | null;
  if (lessonData === null) return '해당하는 유저의 레슨이 더 이상 없습니다.';
  for (const lesson of lessonData.rows) {
    lesson.lesson_id = (lesson as any).dataValues.lesson_id;
  }
  return lessonData;
};

/**
 * Admin용 deleted 게시물까지 포함
 * @param page
 */
export const findAllLessons = async (offset: number, limit: number) => {
  const lessonData = await Lesson.findAndCountAll({
    ...lessonQueryOptions,
    offset,
    limit,
    paranoid: false,
  });
  return lessonData;
};
