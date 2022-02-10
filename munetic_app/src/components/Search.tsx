import { useContext, useEffect, useState } from 'react';
import Contexts from '../context/Contexts';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './common/Button';
import * as Auth from '../lib/api/auth';
import client from '../lib/api/client';
import palette from '../style/palette';
import Select from './common/Select';
import { InputBox } from './common/Input';

import * as SearchAPI from '../lib/api/search';
import {ClassItemContainer} from './lesson/ClassList';
import { LessonBlockData } from '../types/lessonData';


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

interface IProp {
  data: LessonBlockData
}

const ClassItems = ({data}: IProp) => {
  
  return (
    <ClassItemContainer to={`/lesson/class/${data.lesson_id}`}>
      <div className="classItemDescription">
        <span className="classItemCategory">{data.category}</span>
        <span className="classItemTitle">{data.title}</span>
      </div>
    </ClassItemContainer>
  )
}

function convertResponse (arr: any): LessonBlockData[] {

  return (arr.map((lesson: any) =>  ({
    lesson_id: lesson.id,
    tutor_id: lesson.tutor_id,
    tutor_name: lesson.User.name,
    image_url: lesson.User.image_url,
    category: lesson.Category.name,
    title: lesson.title,
    price: lesson.price,
    location: lesson.location,
    minute_per_lesson: lesson.minute_per_lesson,
  })));
}

export default function Search() {
  const { actions } = useContext(Contexts);
  const [searchInput, setSearchInput] = useState<string | undefined>();
  const [searchInstrument, setSearchInstrument] = useState<string | undefined>(
    '악기 전체',
  );
  const [searchValue, setSearchValue] = useState<string | undefined>('글 제목');
  const [searchResult, setSearchResult] = useState<LessonBlockData[]>();


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
  ) =>  setSearchInput(e.target.value);

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
        if (searchValue === "글 제목") {
          const res = await SearchAPI.searchLessonsByTitle(searchInstrument, searchInput);
          setSearchResult(convertResponse(res.data.data));
        } else{
          const res = await SearchAPI.searchLessonsByTutor(searchInstrument, searchInput);
          setSearchResult(convertResponse(res.data.data));
        }
        
        //검색 결과 파싱

        //setSearchResult(true)
        //searchReasult 가 존재할 경우 (showSearchResult)
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
          options={['악기 전체', '기타', '드럼', '피아노', '하프', '첼로', '바이올린']}
          value={searchInstrument}
          defaultValue="전체"
          name="instrument"
          isValid={!!searchInstrument}
          onChange={onChangeSearch}
        />
        <Select
          options={['글 제목', '작성자명']}
          value={searchValue}
          name="category"
          isValid={!!searchValue}
          onChange={onChangeSearch}
        />
        <InputBox
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
          (
            searchResult.map(data => 
              <ClassItems data={data} key={data.lesson_id}/>)
          )
        }
      </ClassListContainer>
    </>
  );
}
