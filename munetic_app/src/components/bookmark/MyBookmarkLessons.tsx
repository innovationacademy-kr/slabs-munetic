import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ClassItemContainer } from '../lesson/ClassList';
import * as BookmarkAPI from '../../lib/api/bookmark';
import * as CatrgoryAPI from '../../lib/api/category';
import { CategoryDataType } from '../../types/categoryData';

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

/**
 * LessonList 컴포넌트의 프로퍼티 정의
 */
export interface LessonListIProps {
  lesson_id: number;
  category: string;
  title: string;
}

/**
 * 레슨 목록 중 하나의 요소
 * 
 * @param lesson_id 레슨 id 
 * @param category 카테고리명
 * @param title 레슨 제목
 * @returns 리액트 앨리먼트
 * @author joohongpark
 */
export function LessonList({lesson_id, category, title}: LessonListIProps) {
  return (
    <ClassItemContainer to={`/lesson/class/${lesson_id}`}>
      <div className="classItemDescription">
        <span className="classItemCategory">{category}</span>
        <span className="classItemTitle">{title}</span>
      </div>
    </ClassItemContainer>
  );
}

export default function MyBookmarkLessons() {
  const [lessons, setLessons] = useState<ReadonlyArray<LessonListIProps>>([])

  useEffect(() => {
    async function getBookmarks() {
      try {
        const categoriesMap = new Map<number, string>();
        const categoriesRes = await CatrgoryAPI.getMyProfile();
        const bookmarksRes = await BookmarkAPI.getLessonBookmarks();
        categoriesRes.data.data.forEach((e: CategoryDataType) => {
          categoriesMap.set(e.id, e.name);
        });
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
          <LessonList
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
