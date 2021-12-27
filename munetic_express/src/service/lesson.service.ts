import { FindOptions } from 'sequelize/dist';
import { Category } from '../models/category.model';
import { lessonAttributes } from '../models/lesson.model';
import { userAttributes } from '../models/user.model';
import { User } from '../models/user.model';
import { categoryAttributes } from '../models/category.model';
import { CategoryInstance, LessonInstance, UserInstance } from '../models';

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
const lessonQueryOption = (id: number): FindOptions<lessonAttributes> => {
  return {
    attributes: [
      ['id', 'lesson_id'],
      'tutor_id',
      'title',
      'price',
      'location',
      'minute_per_lesson',
      'content',
    ],
    where: {
      id,
    },
    include: [
      { model: Category, attributes: ['name'] },
      {
        model: User,
        attributes: [
          'name',
          'nickname',
          'name_public',
          'age',
          'gender',
          'image_url',
        ],
      },
    ],
  };
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
  const tutor = await UserInstance.findOne({
    where: {
      id: tutorId,
    },
  });
  if (tutor === null) return 'No such tutor id';
  const category = await CategoryInstance.findOne({
    where: {
      name: lessonEditable.category,
    },
  });
  if (category === null) return 'No such category name';

  const categoryLess = { ...lessonEditable } as any;
  categoryLess.category = undefined;

  const newLesson = await LessonInstance.create({
    ...categoryLess,
    tutor_id: tutorId,
    category_id: category.id,
  });
  newLesson.save();

  const lesson = (await LessonInstance.findOne(
    lessonQueryOption(newLesson.id),
  )) as LessonAllInfo | null;
  if (lesson === null) throw new Error('Lesson create failed');
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
  const lesson = (await LessonInstance.findOne(
    lessonQueryOption(lessonId),
  )) as unknown as LessonAllInfo | null;
  if (lesson === null) return 'No such lesson';
  lesson.lesson_id = (lesson as any).dataValues.lesson_id;
  return lesson;
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
    category = await CategoryInstance.findOne({
      attributes: ['id'],
      where: { name: lessonEditable.category },
    });
    console.log(lessonEditable.category);
    if (category === null) return 'No such category';
  }
  const [updatedNum] = await LessonInstance.update(
    { ...lessonEditable, category_id: category?.id },
    {
      where: {
        id: lessonId,
      },
    },
  );
  if (updatedNum === 0) return 'No such lesson';
  console.assert(updatedNum === 1);

  const updatedLesson = (await LessonInstance.findOne(
    lessonQueryOption(lessonId),
  )) as LessonAllInfo | null;
  if (updatedLesson === null) throw new Error('Lesson update failed');

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
  const checkExistence = await LessonInstance.findOne({
    where: { id: lessonId },
  });
  if (!checkExistence) return 'No such lesson';

  await checkExistence.destroy();
  return { removed: true };
};
