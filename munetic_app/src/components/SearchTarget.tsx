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
import { ICategoryTable } from '../types/categoryData';
import * as CategoryAPI from '../lib/api/category';

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

const StyledTable = styled.table`
  width: 100%;
`;

const ClassListContainer = styled.div`
  margin: 30px;
  margin-bottom: 66px;
`;

/**
 * 컴포넌트의 프로퍼티 정의
 */
export interface SearchIProps {
  category_id?: string;
}

export default function SearchTarget(props: SearchIProps) {
  const { actions } = useContext(Contexts);
  const [searchInput, setSearchInput] = useState<string | undefined>(props.category_id);
  const [searchInput2, setSearchInput2] = useState<string | undefined>('');
  const [searchInput3, setSearchInput3] = useState<string | undefined>('');

  const [searchResult, setSearchResult] = useState<ReadonlyArray<ILessonData>>([]);
  const [categoryData, setCategoryData] = useState<ICategoryTable[]>();

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setSearchInput(e.target.value);

  const onChange2 = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setSearchInput2(e.target.value);

  const onChange3 = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => setSearchInput3(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    actions.setValidationMode(true);
    try {
      //검색 결과 받기
      const res = await SearchAPI.searchLessonsMix(searchInput,searchInput2,searchInput3);
      setSearchResult((res.data.data.rows));
    } catch (e) {
      console.log(e, '검색 오류 발생');
    }
  };

  useEffect(() => {
    async function getCategory() {
      try {
        const res = await CategoryAPI.getCategories();
        setCategoryData(res.data.data);
        console.log(res.data.data);
      } catch (e) {
        console.log(e, '카테고리를 불러오지 못했습니다.');
      }
    }
    getCategory();
  }, []);

  useEffect(() => {
    return () => {
      actions.setValidationMode(false);
    };
  }, []);
  
  return (
    <>
      <Container onSubmit={onSubmit}>
        <StyledTable>
        <tr><td>악기 :&nbsp;</td>
        <td><Select
          options={
            categoryData?.map(category => category.name) as string[]
          }
          value={searchInput}
          name="Search_Input"
          isValid={ true }
          onChange={onChange}
        /></td><td><pre>  </pre></td>
        <td>글쓴이 :&nbsp;</td>
        <td><SearchInputBox
          inputName="검색어 입력"
          name="Search_Input2"
          value={searchInput2}
          onChange={onChange2}
          isValid={ true }
        /></td><td><pre>  </pre></td>
        <td>지역 :&nbsp;</td>
        <td><SearchInputBox
          inputName="검색어 입력"
          name="Search_Input3"
          value={searchInput3}
          onChange={onChange3}
          isValid={ true }
        /></td></tr>
        </StyledTable>
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
