import { useState } from 'react';
import styled from 'styled-components';
import { categoryData } from '../../dummy/categoryData';
import { userData } from '../../dummy/userData';
import palette from '../../style/palette';
import Input from '../common/Input';
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

const InputBoxContainer = styled.div`
  margin-top: 10px;
  display: flex;
  font-size: 16px;
  .inputTitle {
    line-height: 35px;
    font-weight: bold;
    color: ${palette.grayBlue};
    flex: 1;
    height: 30px;
  }
  .input {
    font-weight: normal;
    font-size: 16px;
    text-align: center;
    border: none;
    border-bottom: 1px solid ${palette.grayBlue};
    color: ${palette.grayBlue};
    height: 30px;
  }
`;

const StyledTitleInput = styled(Input)`
  margin: 10px 0px;
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

interface InputBoxProps {
  title: string;
  isReadOnly?: boolean;
  value?: string;
  type?: string;
}

const InputBox = ({ title, isReadOnly, value, type }: InputBoxProps) => {
  return (
    <InputBoxContainer>
      <span className="inputTitle">{title}</span>
      <Input
        value={value}
        className="input"
        isReadOnly={isReadOnly}
        type={type}
      />
    </InputBoxContainer>
  );
};

export default function ClassWrite() {
  const [categoryValue, setCategoryValue] = useState('');
  const { phone_number, gender } = userData[0];
  const category = categoryData.filter(category => category !== '전체');
  return (
    <Container>
      <StyledTitleInput placeholder="제목" />
      <Select
        options={category}
        disabledOptions={['카테고리']}
        defaultValue={'카테고리'}
        onChange={e => setCategoryValue(e.target.value)}
        isValid={!!categoryValue}
        errorMessage="카테고리를 선택하세요."
      />
      <div className="infoName">레슨 기본 정보</div>
      <InputBox title="가격" type="number" />
      <InputBox title="연락처" isReadOnly value={phone_number} />
      <InputBox title="성별" isReadOnly value={gender} />
      <InputBox title="지역" />
      <InputBox title="회차당 수업 시간" type="number" />
      <IntroContent>
        <div className="introTitle">본문</div>
        <textarea className="introContent" placeholder="내용을 입력해주세요." />
      </IntroContent>
    </Container>
  );
}
