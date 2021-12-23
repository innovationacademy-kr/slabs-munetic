import { FindOptions } from 'sequelize/dist';
import { Category } from '../models/category.model';
import { lessonAttributes } from '../models/lesson.model';
import { Gender, userAttributes } from '../models/user.model';
import { User } from '../models/user.model';
import { ResponseData, ServiceResponse } from '../types';
import { categoryAttributes } from '../models/category.model';
import { CategoryInstance, LessonInstance, UserInstance } from '../models';
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK } from 'http-status';

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
 * @param lessonInfo Lesson information which will be the Lesson object
 * @returns Lesson information which is created
 */
export const createLesson = async (
  tutorId: number,
  lessonInfo: LessonEditable, // 'unknown' in runtime
): Promise<ServiceResponse> => {
  const lessonEditable = checkLessonEditable(lessonInfo); // 'unknown' test
  if (!lessonEditable)
    throw new ServiceResponse(BAD_REQUEST, 'Invalid data passed');

  if (typeof lessonEditable.category === undefined)
    throw new ServiceResponse(BAD_REQUEST, 'Category name required');
  if (lessonEditable.title === undefined)
    throw new ServiceResponse(BAD_REQUEST, 'Title required');

  const tutor = await UserInstance.findOne({
    where: {
      id: tutorId,
    },
  });
  if (tutor === null)
    throw new ServiceResponse(BAD_REQUEST, 'Invalid tutor id');
  const category = await CategoryInstance.findOne({
    where: {
      name: lessonEditable.category,
    },
  });
  if (category === null)
    throw new ServiceResponse(BAD_REQUEST, 'invalid category name');

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
  if (lesson === null)
    throw new ServiceResponse(INTERNAL_SERVER_ERROR, 'Lesson create failed');
  lesson.lesson_id = (lesson as any).dataValues.lesson_id; // 왠지 모르겠지만 바로 들어가지 않음. User와의 property 차이일까?
  return new ServiceResponse(CREATED, LessonAllInfoToRes(lesson));
};

/**
 * Get lesson information by a lesson id
 *
 * @param lessonId Lesson id for finding a lesson
 * @returns A lesson corresponding to the `lessonId`. In there's no corresponding lesson, string is returned
 */
export const findLesson = async (
  lessonId: number,
): Promise<ServiceResponse> => {
  const lesson = (await LessonInstance.findOne(
    lessonQueryOption(lessonId),
  )) as unknown as LessonAllInfo | null;
  if (lesson === null) throw new ServiceResponse(BAD_REQUEST, 'No such lesson');
  lesson.lesson_id = (lesson as any).dataValues.lesson_id;
  return new ServiceResponse(OK, LessonAllInfoToRes(lesson));
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
  lessonInfo: LessonEditable, // 'unknown' in runtime
): Promise<ServiceResponse> => {
  const lessonEditable = checkLessonEditable(lessonInfo); // unknown check
  if (!lessonEditable)
    throw new ServiceResponse(BAD_REQUEST, 'Invalid data passed');

  let category;
  if (lessonEditable.category) {
    category = await CategoryInstance.findOne({
      attributes: ['id'],
      where: { name: lessonEditable.category },
    });
    console.log(lessonEditable.category);
    if (category === null)
      throw new ServiceResponse(BAD_REQUEST, 'No such category');
  }
  const [updatedNum] = await LessonInstance.update(
    { ...lessonEditable, category_id: category?.id },
    {
      where: {
        id: lessonId,
      },
    },
  );
  if (updatedNum === 0)
    throw new ServiceResponse(BAD_REQUEST, 'No such lesson');
  console.assert(updatedNum === 1);

  const updatedLesson = (await LessonInstance.findOne(
    lessonQueryOption(lessonId),
  )) as LessonAllInfo | null;
  if (updatedLesson === null)
    throw new ServiceResponse(INTERNAL_SERVER_ERROR, 'Lesson update failed');

  updatedLesson.lesson_id = (updatedLesson as any).dataValues.lesson_id; // 이유를 알 수 없다.

  return new ServiceResponse(OK, LessonAllInfoToRes(updatedLesson));
};

/**
 * Delete a lesson by lesson id.
 *
 * @param lessonId Lesson id to be deleted
 * @returns Whether the lesson is deleted or not. If there is no corresponding lesson, returns false
 */
export const removeLesson = async (
  lessonId: number,
): Promise<ServiceResponse> => {
  const checkExistence = await LessonInstance.findOne({
    where: { id: lessonId },
  });
  if (!checkExistence) throw new ServiceResponse(BAD_REQUEST, 'No such lesson');

  await checkExistence.destroy();
  return new ServiceResponse(OK, { removed: true });
};
