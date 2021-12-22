import { FindOptions } from 'sequelize/dist';
import { Category } from '../models/category.model';
import { lessonAttributes } from '../models/lesson.model';
import { Gender, userAttributes } from '../models/user.model';
import { User } from '../models/user.model';
import { ResponseData } from '../types';
import { categoryAttributes } from '../models/category.model';
import { CategoryInstance, LessonInstance, UserInstance } from '../models';

/**
 * Lesson information form of response
 */
export interface LessonRes extends ResponseData {
  lesson_id: number;
  tutor_id: number;
  tutor_name: string;
  gender?: Gender;
  age?: number;
  profile_pic?: string;
  editable: LessonEditable;
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
type LessonAllInfo = {
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
 * check if the argument is a valid `LessonEditable`
 *
 * @param unchecked Unknown parameter to be checked
 */
export const checkLessonEditable = (unchecked: any): LessonEditable | null => {
  let propertyNum = 0;
  if (unchecked && unchecked.category && typeof unchecked.category === 'string')
    propertyNum++;
  if (unchecked && unchecked.title && typeof unchecked.title === 'string')
    propertyNum++;
  if (unchecked && unchecked.price && typeof unchecked.price === 'number')
    propertyNum++;
  if (unchecked && unchecked.location && typeof unchecked.location === 'string')
    propertyNum++;
  if (
    unchecked &&
    unchecked.minute_per_lesson &&
    typeof unchecked.minute_per_lesson === 'number'
  )
    propertyNum++;
  if (unchecked && unchecked.content && typeof unchecked.content === 'string')
    propertyNum++;
  // // check existence and type of each property and turn into 1 thorugh boolean value
  // propertyNum +=
  //   +!!unchecked?.category?.concat?.(' ', 'c') +
  //   +!!unchecked?.title?.concat?.(' ', 'c') +
  //   +!!unchecked?.price?.toString?.() +
  //   +!!unchecked?.location?.concat?.(' ', 'c') +
  //   +!!unchecked?.minute_per_lesson?.concat?.(' ', 'c') +
  //   +!!unchecked?.content?.concat?.(' ', 'c');

  const uncheckedNum = Object.keys(unchecked).length;
  if (uncheckedNum !== 0 && uncheckedNum === propertyNum) return unchecked;
  return null;
};

/**
 * Convert LessonAllInfo to LessonRes
 */
const LessonAllInfoToRes = ({
  lesson_id,
  tutor_id,
  title,
  price = undefined,
  location = undefined,
  minute_per_lesson = undefined,
  content = undefined,
  Category: { name: category },
  User: {
    name = undefined,
    nickname = undefined,
    name_public = undefined,
    gender = undefined,
    age = undefined,
    image_url: profile_pic = undefined,
  },
}: LessonAllInfo): LessonRes => {
  return {
    lesson_id,
    tutor_id,
    tutor_name: (name_public ? name : nickname) as string,
    gender,
    age,
    profile_pic,
    editable: {
      category,
      title,
      price,
      location,
      minute_per_lesson,
      content,
    },
  };
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
    include: [{ model: Category }, { model: User }],
  };
};

/**
 *  put a lesson row in the database. In case of failure, string is returned
 *
 * @param tutorId Id of a tutor which will be the owner of the lesson
 * @param lessonInfo Lesson information which will be the Lesson object
 * @returns Lesson information which is created
 */
export const createLesson = async (
  tutorId: number,
  lessonInfo: unknown,
): Promise<LessonRes | string> => {
  const lessonEditable = checkLessonEditable(lessonInfo);
  if (!lessonEditable) return 'Invalid data passed';

  if (lessonEditable.category === undefined) return 'No category defined';
  const tutor = await UserInstance.findOne({
    where: {
      id: tutorId,
    },
  });

  if (tutor === null) return 'Invalid tutor id';
  const category = await CategoryInstance.findOne({
    where: {
      name: lessonEditable.category,
    },
  });
  if (category === null) return 'invalid category name';

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
  if (lesson === null) return 'Lesson create failed';
  lesson.lesson_id = (lesson as any).dataValues.lesson_id; // 왠지 모르겠지만 바로 들어가지 않음. User와의 property 차이일까?
  lesson.User = tutor;
  lesson.Category = category;
  return LessonAllInfoToRes(lesson);
};

/**
 * Get lesson information by a lesson id
 *
 * @param lessonId Lesson id for finding a lesson
 * @returns A lesson corresponding to the `lessonId`. In there's no corresponding lesson, string is returned
 */
export const getLesson = async (
  lessonId: number,
): Promise<LessonRes | string> => {
  const lesson = (await LessonInstance.findOne(
    lessonQueryOption(lessonId),
  )) as LessonAllInfo | null;
  return lesson === null ? 'No such lesson' : LessonAllInfoToRes(lesson);
};

/**
 * Edit lesson information of a lesson id only present in lessonInfo. In case of failure, string is returned
 *
 * @param lessonId Id of a lesson to be editted
 * @param lessonInfo partial information of lesson which will be inserted
 * @returns The edited lesson
 */
export const editLesson = async (
  lessonId: number,
  lessonInfo: unknown,
): Promise<LessonRes | string> => {
  const lessonEditable = checkLessonEditable(lessonInfo);
  if (!lessonEditable) return 'Invalid data passed';

  const [updatedNum] = await LessonInstance.update(lessonEditable, {
    where: {
      id: lessonId,
    },
  });
  if (updatedNum === 0) return 'No such lesson';
  console.assert(updatedNum === 1);

  const updatedLesson = (await LessonInstance.findOne(
    lessonQueryOption(lessonId),
  )) as LessonAllInfo | null;
  if (updatedLesson === null) return 'Lesson update failed';

  return LessonAllInfoToRes(updatedLesson);
};

/**
 * Delete a lesson by lesson id.
 *
 * @param lessonId Lesson id to be deleted
 * @returns Whether the lesson is deleted or not. If there is no corresponding lesson, returns false
 */
export const deleteLesson = async (
  lessonId: number,
): Promise<boolean | string> => {
  const deleteNum = await LessonInstance.destroy({ where: { id: lessonId } });
  return deleteNum ? true : 'lesson delete failed';
};
