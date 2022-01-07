import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Contexts from '../../context/Contexts';
import { categoryData } from '../../dummy/categoryData';
import palette from '../../style/palette';
import { LessonWriteData } from '../../types/lessonData';
import Input, { InputBox } from '../common/Input';
import Select from '../common/Select';
import * as LessonAPI from '../../lib/api/lesson';
import * as ProfileAPI from '../../lib/api/profile';
import { UserDataType } from '../../types/userData';

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
  const classId = useParams().id;

  const navigate = useNavigate();
  const { state, actions } = useContext(Contexts);
  const [userData, setUserData] = useState<UserDataType>();
  const [classInfo, setClassInfo] = useState<LessonWriteData>({
    title: '',
    category: undefined,
    location: '',
    price: 10000,
    minute_per_lesson: 30,
    content: '',
  });
  const { title, category, price, location, minute_per_lesson, content } =
    classInfo;

  const onChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { value, name } = e.target;
    if (name === 'price' || name === 'minute_per_lesson') {
      setClassInfo({
        ...classInfo,
        [name]: parseInt(value),
      });
    } else {
      setClassInfo({
        ...classInfo,
        [name]: value,
      });
    }
  };

  const validateWriteForm = () => {
    if (!title || !category || !price || !location || !minute_per_lesson) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (state.write) {
      actions.setValidationMode(true);
      if (validateWriteForm()) {
        let madeClassId;
        if (classId) {
          LessonAPI.editLessonById(Number(classId), classInfo)
            .then(res => {
              madeClassId = res.data.data.lesson_id;
              actions.setWrite(false);
              navigate(`/lesson/class/${madeClassId}`, { replace: true });
            })
            .catch(e => {
              console.log(e);
            });
        } else {
          LessonAPI.postLesson(Number(userData?.id), classInfo)
            .then(res => {
              madeClassId = res.data.data.lesson_id;
              actions.setWrite(false);
              navigate(`/lesson/class/${madeClassId}`, { replace: true });
            })
            .catch(e => {
              console.log(e);
            });
        }
      }
      actions.setWrite(false);
    }
  }, [state]);

  useEffect(() => {
    return () => {
      actions.setValidationMode(false);
    };
  }, []);

  useEffect(() => {
    async function getMyProfile() {
      try {
        const userProfile = await ProfileAPI.getMyProfile();
        setUserData(userProfile.data.data);
      } catch (e) {
        console.log(e, '내 프로필을 불러오지 못했습니다.');
      }
    }
    async function getLessonById(id: string) {
      try {
        const res = await LessonAPI.getLesson(Number(id));
        setClassInfo(res.data.data.editable);
      } catch (e) {
        console.log(e, 'id로 레슨을 불러오지 못했습니다.');
      }
    }
    getMyProfile();
    if (classId) {
      getLessonById(classId);
    }
  }, [classId]);

  return (
    <Container>
      <StyledTitleInput
        name="title"
        placeholder="제목"
        value={title}
        isValid={!!title}
        onChange={onChangeInput}
      />
      <Select
        title="카테고리"
        options={categoryData.filter(category => category !== '전체')}
        value={category}
        name="category"
        disabledOptions={['카테고리']}
        defaultValue="카테고리"
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
        isValid={!!price}
        onChange={onChangeInput}
      />
      <InputBox
        inputName="연락처"
        isReadOnly
        useValidation={false}
        value={userData?.phone_number ? userData.phone_number : ''}
      />
      <InputBox
        inputName="성별"
        isReadOnly
        useValidation={false}
        value={userData?.gender ? userData.gender : ''}
      />
      <InputBox
        inputName="지역"
        name="location"
        value={location}
        isValid={!!location}
        onChange={onChangeInput}
      />
      <InputBox
        inputName="회차당 수업 시간"
        type="number"
        name="minute_per_lesson"
        value={minute_per_lesson}
        isValid={!!minute_per_lesson}
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
