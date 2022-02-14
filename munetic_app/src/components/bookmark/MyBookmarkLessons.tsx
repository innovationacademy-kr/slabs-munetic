import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LessonItem, LessonItemIProps } from '../lesson/lessonlist/LessonItem';
import * as BookmarkAPI from '../../lib/api/bookmark';
import { ICategoryTable } from '../../types/categoryData';
import getCategoriesByMap from '../../lib/getCategoriesByMap';

/**
 * 짧은 텍스트 라벨을 붙이는 컴포넌트입니다.
 * styled-components를 이용해 리액트 컴포넌트로 만들어 스타일을 적용합니다.
 * 
 * @author joohongpark
 */
const Label = styled.div`
  font-family: "Roboto","Arial",sans-serif;
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
`;

export default function MyBookmarkLessons() {
  const [lessons, setLessons] = useState<ReadonlyArray<LessonItemIProps>>([])

  useEffect(() => {
    async function getBookmarks() {
      try {
        const categoriesMap = await getCategoriesByMap();
        const bookmarksRes = await BookmarkAPI.getLessonBookmarks();
        const categories = bookmarksRes.data.data.map((c: any) => ({
          lesson_id: c.lesson_id,
          category: categoriesMap.get(c.Lesson.category_id),
          title: c.Lesson.content,
        }));
        setLessons(categories);
      } catch (e) {
        console.log(e, '좋아요한 강의 목록을 불러오지 못했습니다.');
      }
    }
    getBookmarks();
  }, []);

  return (
    <>
     <Label>
       북마크 한 강의 목록
     </Label>
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
