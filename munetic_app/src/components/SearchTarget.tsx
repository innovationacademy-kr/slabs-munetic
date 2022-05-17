import { useContext, useEffect, useState } from 'react';
import Contexts from '../context/Contexts';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './common/Button';
import * as Auth from '../lib/api/auth';
import client from '../lib/api/client';
import palette from '../style/palette';
import Select from './common/Select';
import { SearchInputBox } from './common/Input';

import * as SearchAPI from '../lib/api/search';
import { LessonItem, LessonItemIProps } from './lesson/lessonlist/LessonItem';
import { ILessonData } from '../types/lessonData';

const Container = styled.form`
  margin: 100px 30px 30px 30px;
  padding: 30px;
  border-radius: 10px;
  background-color: ${palette.green};
  .registerButton {
    margin-top: 20px;
  }
  .checkWrapper {
    display: flex;
    .checkInput {
      flex: 1 0 auto;
    }
    .checkBtn {
      flex-shrink: 0;
      font-size: 13px;
      color: ${palette.green};
      border: 0;
      border-radius: 5px;
      background-color: ${palette.grayBlue};
      margin: 10px 0px 0px 5px;
      line-height: 30px;
      height: 30px;
    }
  }
  .dupErrorMessage {
    text-align: center;
    color: ${palette.red};
    font-size: 14px;
    margin-top: 15px;
  }
`;
const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  ::before {
    padding-top: 0%;
  }
`;

const ClassListContainer = styled.div`
  margin: 30px;
  margin-bottom: 66px;
`;

function convertResponse(arr: any): ReadonlyArray<LessonItemIProps> {
  return arr.map((lesson: any) => ({
    lesson_id: lesson.id,
    category: lesson.Category.name,
    title: lesson.title,
  }));
}

/**
 * ClassList 컴포넌트의 프로퍼티 정의
 */
 export interface ClassListIProps {
  category_id?: number;
}

export default function SearchTarget(props: ClassListIProps) {
  const { actions } = useContext(Contexts);
  const [searchInput, setSearchInput] = useState<string | undefined>('');
  const [searchInstrument, setSearchInstrument] = useState<string | undefined>(
    '악기 전체',
  );
  const [searchValue, setSearchValue] = useState<string | undefined>('악기별 검색');
  const [searchResult, setSearchResult] = useState<ReadonlyArray<ILessonData>>([]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;

    if (name === 'instrument') {
      setSearchInstrument(value);
    } else if (name === 'category') {
      setSearchValue(value);
    }
  };
  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setSearchInput(e.target.value);

  const validateSearchForm = () => {
    if (!searchInput) {
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.setValidationMode(true);
    if (validateSearchForm()) {
      try {
        //검색 결과 받기
        if (searchValue === '악기별 검색') {
          const res = await SearchAPI.searchLessonsByInstrument(searchInput);
          setSearchResult((res.data.data.rows));
        } else if (searchValue === '글쓴이 이름으로 검색') {
          const res = await SearchAPI.searchLessonsByTutor(searchInput);
          setSearchResult((res.data.data.rows));
        } else { // 지역 검색
          const res = await SearchAPI.searchLessonsByLocation(searchInput);
          setSearchResult((res.data.data.rows));
        }
        
      } catch (e) {
        console.log(e, '검색 오류 발생');
      }
    }
  };

  useEffect(() => {
    return () => {
      actions.setValidationMode(false);
    };
  }, []);
  return (
    <>
      <Container onSubmit={onSubmit}>
        <Select
            options={[
              '악기별 검색',
              '글쓴이 이름으로 검색',
              '지역 검색',
            ]}
            value={searchValue}
            name="category"
            isValid={!!searchValue}
            onChange={onChangeSearch}
          />
          <SearchInputBox
            inputName="검색어 입력"
            name="Search_Input"
            value={searchInput}
            onChange={onChange}
            isValid={!!searchInput}
            errorMessage="검색어를 입력하세요."
          />
          <StyledButton type="submit">검색하기</StyledButton>
      </Container>

      <ClassListContainer>
        {searchResult &&
          searchResult.map(lesson => (
            <LessonItem
              lesson_id={lesson.id}
              category={lesson.Category.name || ""}
              title={lesson.title || ""}
              name = {lesson.User.name || ""}
              location={lesson.location || ""}
              price={lesson.price || 0}
              comment_num={lesson.CommentsCount || 0}
              lessonLike_num={lesson.LessonLikesCount || 0}
              key={lesson.id}
              image_url={lesson.User.image_url}
            />
          ))}
      </ClassListContainer>
    </>
  );
}
