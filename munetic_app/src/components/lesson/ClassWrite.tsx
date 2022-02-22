import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Contexts from '../../context/Contexts';
import palette from '../../style/palette';
import { ILessonTable } from '../../types/lessonData';
import Input, { InputBox } from '../common/Input';
import Select from '../common/Select';
import * as LessonAPI from '../../lib/api/lesson';
import * as ProfileAPI from '../../lib/api/profile';
import { IUserTable } from '../../types/userData';
import getCategoriesByMap from '../../lib/getCategoriesByMap';
import getYoutubeId from '../../lib/getYoutubeId';

const Container = styled.div`
  margin: 10px 10px 64px 10px;
  background-color: ${palette.green};
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
  const [userData, setUserData] = useState<IUserTable>();
  const [categoryData, setCategoryData] = useState<Map<number, string>>();
  const [classInfo, setClassInfo] = useState<ILessonTable>();

  const onChangeInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { value, name } = e.target;
    const newClassInfo: ILessonTable = classInfo ? {...classInfo} : {id: 0, tutor_id: Number(userData?.id), category_id: 0};
    if (name === 'title' || name === 'location' || name === 'content' || name === 'youtube') {
      newClassInfo[name] = value as string;
    } else if (name === 'createdAt' || name === 'updatedAt' || name === 'deletedAt') {
      newClassInfo[name] = new Date();
    } else if (name === 'price' || name === 'minute_per_lesson') {
      newClassInfo[name] = parseInt(value);
    } else if (name === 'category_id') {
      for (let [k, v] of categoryData?.entries() || []) {
        if (v === value) {
          newClassInfo[name] = k;
        }
      }
    }
    setClassInfo(newClassInfo);
  };

  const validateWriteForm = () => {
    if (classInfo !== undefined) {
      if (!classInfo.title || !classInfo.category_id || !classInfo.price || !classInfo.location || !classInfo.youtube || !classInfo.minute_per_lesson) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (state.write) {
      actions.setValidationMode(true);
      if (validateWriteForm()) {
        if (!!classInfo) {
          // FIXME: 유튜브 링크에서 ID만 추출해 저장하기 위한 로직 (수정 필요할 듯)
          classInfo.youtube = getYoutubeId(classInfo?.youtube || '');
          if (classId) {
            LessonAPI.editLessonById(Number(classId), classInfo)
              .then(res => {
                actions.setWrite(false);
                navigate(`/lesson/class/${classId}`, { replace: true });
              })
              .catch(e => {
                alert("해당 카테고리에는 하나의 글만 작성 가능합니다.");
                console.log(e);
              });
          } else {
            LessonAPI.postLesson(Number(userData?.id), classInfo)
              .then(res => {
                actions.setWrite(false);
                navigate(`/lesson/class/${res.data.data.id}`, { replace: true });
              })
              .catch(e => {
                alert("해당 카테고리에는 하나의 글만 작성 가능합니다.");
                console.log(e);
              });
          }
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
        setClassInfo(res.data.data);
      } catch (e) {
        console.log(e, 'id로 레슨을 불러오지 못했습니다.');
      }
    }
    getMyProfile();
    if (classId) {
      getLessonById(classId);
    }
  }, [classId]);

  useEffect(() => {
    (async () => {
      const categoriesMap = await getCategoriesByMap();
      setCategoryData(categoriesMap);
    })();
  }, []);

  return (
    <Container>
      <StyledTitleInput
        name="title"
        placeholder="제목"
        value={classInfo?.title || ""}
        isValid={!!classInfo?.title}
        onChange={onChangeInput}
      />
      <Select
        title="카테고리"
        options={Array.from(categoryData?.values() || [])}
        value={categoryData?.get(classInfo?.category_id || 0)}
        name="category_id"
        disabledOptions={[]}
        defaultValue="카테고리"
        onChange={onChangeInput}
        isValid={!!classInfo?.category_id}
        errorMessage="카테고리를 선택하세요."
      />
      <div className="infoName">레슨 기본 정보</div>
      <InputBox
        inputName="가격"
        type="number"
        name="price"
        value={classInfo?.price || 0}
        isValid={!!classInfo?.price}
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
        value={classInfo?.location || ""}
        isValid={!!classInfo?.location}
        onChange={onChangeInput}
      />
      <InputBox
        inputName="유튜브 영상 링크"
        name="youtube"
        value={classInfo?.youtube || ""}
        isValid={getYoutubeId(classInfo?.youtube || "") !== undefined}
        onChange={onChangeInput}
      />
      <InputBox
        inputName="회차당 수업 시간"
        type="number"
        name="minute_per_lesson"
        value={classInfo?.minute_per_lesson || 0}
        isValid={!!classInfo?.minute_per_lesson}
        onChange={onChangeInput}
      />
      <IntroContent>
        <div className="introTitle">본문</div>
        <textarea
          name="content"
          className="introContent"
          placeholder="내용을 입력해주세요."
          value={classInfo?.content || ""}
          onChange={onChangeInput}
        />
      </IntroContent>
    </Container>
  );
}
