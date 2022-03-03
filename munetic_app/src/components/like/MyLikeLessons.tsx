import { useEffect, useState } from 'react';
import { LessonItem, LessonItemIProps } from '../lesson/lessonlist/LessonItem';
import * as LikeAPI from '../../lib/api/like';
import getCategoriesByMap from '../../lib/getCategoriesByMap';

export default function MyLikesPage() {
  const [lessons, setLessons] = useState<ReadonlyArray<LessonItemIProps>>([])

  useEffect(() => {
    async function getMyProfile() {
      try {
        const categoriesMap = await getCategoriesByMap();
        const lessonLikeRes = await LikeAPI.getLessonLikes();
        const categories = lessonLikeRes.data.data.map((c: any) => ({
          lesson_id: c.lesson_id,
          category: categoriesMap.get(c.Lesson.category_id),
          title: c.Lesson.content,
        }));
        setLessons(categories);
      } catch (e) {
        console.log(e, '좋아요한 강의 목록을 불러오지 못했습니다.');
      }
    }
    getMyProfile();
  }, []);

  return (
    <>
      {
        lessons.map((lessons) =>
          <LessonItem
            lesson_id={lessons.lesson_id}
            category={lessons.category}
            title={lessons.title}
            key={lessons.lesson_id}
          />
        )
      }
    </>
  );
}
