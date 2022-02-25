import { Category } from "../models/category";
import { Lesson } from "../models/lesson";
import { User } from "../models/user";
import { LessonAllInfo } from "../types/service/lesson.service";


/**
 * Lesson 엔티티를 LessonAllInfo로 매핑합니다.
 * 
 * @param lesson Lesson
 * @returns LessonAllInfo
 * @author joohongpark
 */
export function toLessonAllInfo(lesson: Lesson, CommentsCount?: number, LessonLikesCount?: number) : LessonAllInfo {
  return {
    id: lesson.id,
    tutor_id: lesson.tutor_id,
    title: lesson.title,
    price: lesson.price || undefined,
    location: lesson.location || undefined,
    minute_per_lesson: lesson.minute_per_lesson || undefined,
    content: lesson.content || undefined,
    Category: lesson.get('Category') as Category,
    User: lesson.get('User') as User,
    CommentsCount,
    LessonLikesCount,
  };
}