import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import WriteContext from '../../context/writeContext';
import { categoryData } from '../../dummy/categoryData';
import { classData } from '../../dummy/classData';
import { userData } from '../../dummy/userData';
import palette from '../../style/palette';
import Input, { InputBox } from '../common/Input';
import Select from '../common/Select';

const Container = styled.div`
  margin: 10px 10px 64px 10px;
  background-color: ${palette.ivory};
  padding: 15px 20px;
  font-size: 17px;
  font-weight: bold;
  color: ${palette.darkBlue};
  height: calc(100vh + 56px);
  .infoName {
    margin-top: 15px;
  }
`;

const StyledTitleInput = styled(Input)`
  margin-top: 10px;
  height: 35px;
  width: 100%;
  padding-left: 10px;
  color: ${palette.grayBlue};
  font-size: 20px;
  border: none;
  border-bottom: 1px solid ${palette.grayBlue};
`;

const IntroContent = styled.div`
  margin-top: 20px;
  font-weight: bold;
  color: ${palette.grayBlue};
  font-size: 16px;
  .introContent {
    width: 100%;
    height: 450px;
    margin: 10px 0;
    padding: 15px 15px;
    border-radius: 5px;
    border: none;
    background-color: white;
    font-weight: normal;
    font-size: 16px;
    outline: none;
    resize: none;
  }
`;

export default function ClassWrite() {
  const navigate = useNavigate();
  const { state, actions } = useContext(WriteContext);

  //로그인한 유저의 user 데이터에서 연락처, 성별 받아와서 자동 입력
  const { nickname, image_url, phone_number, gender } = userData[0];
  const [classes, setClasses] = useState(classData);
  const [classInfo, setClassInfo] = useState({
    id: 6,
    title: '',
    img: image_url,
    category: '',
    nickname,
    phone_number,
    age: 0,
    place: '',
    price: 0,
    gender,
    minute: 0,
    content: '',
  });
  const { id, title, category, price, place, minute, content } = classInfo;
  const onChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { value, name } = e.target;
    setClassInfo({
      ...classInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    if (state.write) {
      setClasses(classes.concat(classInfo));
      navigate(`/lesson/class/${id}`);
      actions.setWrite(false);
    }
  }, [state]);

  return (
    <Container>
      <StyledTitleInput
        name="title"
        placeholder="제목"
        value={title}
        onChange={onChangeInput}
      />
      <Select
        title="카테고리"
        options={categoryData.filter(category => category !== '전체')}
        value={category}
        name="category"
        onChange={onChangeInput}
        isValid={!!category}
        errorMessage="카테고리를 선택하세요."
      />
      <div className="infoName">레슨 기본 정보</div>
      <InputBox
        inputName="가격"
        type="number"
        name="price"
        value={price}
        onChange={onChangeInput}
      />
      <InputBox
        inputName="연락처"
        isReadOnly
        useValidation={false}
        value={phone_number}
      />
      <InputBox
        inputName="성별"
        isReadOnly
        useValidation={false}
        value={gender}
      />
      <InputBox
        inputName="지역"
        name="place"
        value={place}
        onChange={onChangeInput}
      />
      <InputBox
        inputName="회차당 수업 시간"
        type="number"
        name="minute"
        value={minute}
        onChange={onChangeInput}
      />
      <IntroContent>
        <div className="introTitle">본문</div>
        <textarea
          name="content"
          className="introContent"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={onChangeInput}
        />
      </IntroContent>
    </Container>
  );
}
