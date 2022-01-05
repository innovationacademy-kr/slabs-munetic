import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import palette from '../../style/palette';
import * as LessonAPI from '../../lib/api/lesson';
import * as ProfileAPI from '../../lib/api/profile';
import { LessonData } from '../../types/lessonData';
import { UserDataType } from '../../types/userData';
import { Gender } from '../../types/enums';

const ClassContainer = styled.div`
  margin: 10px;
  background-color: ${palette.ivory};
`;

const ClassProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${palette.darkBlue};
  .imgAndNickname {
    margin: 20px;
    display: flex;
    flex-direction: column;
  }
  .profileImg {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
  .nickname {
    margin-top: 10px;
    text-align: center;
    font-size: large;
    font-weight: bold;
    color: ${palette.darkBlue};
  }
  .sns {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
  }
`;

const ClassPhoneNumber = styled.div`
  padding: 15px 20px;
  font-size: 17px;
  font-weight: bold;
  color: ${palette.darkBlue};
  border-bottom: 1px solid ${palette.darkBlue};
  .phoneNumber {
    font-weight: normal;
    color: ${palette.grayBlue};
  }
`;

const ClassBasicInfo = styled.div`
  padding: 15px 20px;
  font-size: 17px;
  font-weight: bold;
  color: ${palette.darkBlue};
  border-bottom: 1px solid ${palette.darkBlue};
  .basicInfo {
    margin: 10px 15px 0px 5px;
  }
  .basicInfoDetail {
    display: flex;
    margin: 5px 0;
    font-size: 16px;
  }
  .basicInfoDetailTitle {
    flex: 1;
  }
  .basicInfoDetailValue {
    font-weight: normal;
    flex: 1.5;
    color: ${palette.grayBlue};
  }
`;

const ClassContent = styled.div`
  padding: 15px 20px;
  font-size: 17px;
  font-weight: bold;
  color: ${palette.darkBlue};
  border-bottom: 1px solid ${palette.darkBlue};
  .contentBox {
    margin: 10px 0;
    padding: 25px 15px;
    border-radius: 5px;
    background-color: white;
  }
  .contentText {
    font-weight: normal;
    font-size: 16px;
  }
`;

interface InfosType {
  나이: string;
  '지역/장소': string;
  가격: number;
  '선생님 성별': string;
  '수업 시간': number;
}

interface RenderInfoProps {
  infos: InfosType;
}

const RenderInfo = ({ infos }: RenderInfoProps) => {
  const infoArray = [];
  for (const [key, value] of Object.entries(infos)) {
    infoArray.push({ title: key, answer: value });
  }
  return (
    <div className="basicInfo">
      {infos &&
        infoArray.map(info => (
          <div className="basicInfoDetail" key={info.title}>
            <span className="basicInfoDetailTitle">• {info.title}</span>
            <span className="basicInfoDetailValue">{info.answer}</span>
          </div>
        ))}
    </div>
  );
};

export default function Class() {
  const classId = useParams().id;
  const [userData, setUserData] = useState<UserDataType>();
  const [classInfo, setClassInfo] = useState<LessonData>({
    lesson_id: 0,
    tutor_id: 0,
    tutor_name: '',
    gender: Gender.Male,
    birth: '',
    image_url: '',
    editable: {
      category: '',
      title: '',
      price: 0,
      location: '',
      minute_per_lesson: 0,
      content: '',
    },
  });

  const { tutor_id, image_url, tutor_name, birth, gender, editable } =
    classInfo;
  const { price, location, minute_per_lesson, content } = editable;

  const basicInfos = {
    나이: birth,
    '지역/장소': location,
    가격: price,
    '선생님 성별': gender,
    '수업 시간': minute_per_lesson,
  };

  useEffect(() => {
    async function getProfileById(id: number) {
      try {
        const userProfile = await ProfileAPI.getProfileById(id);
        setUserData(userProfile.data.data);
      } catch (e) {
        console.log(e, '프로필을 불러오지 못했습니다.');
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
    if (classId) {
      getLessonById(classId);
      getProfileById(tutor_id);
    }
  }, [classId, tutor_id]);

  return (
    <ClassContainer>
      <ClassProfileWrapper>
        <div className="imgAndNickname">
          <img className="profileImg" src={image_url} alt="" />
          <span className="nickname">{tutor_name}</span>
        </div>
        <div className="sns">
          <div className="snsTop">
            <FavoriteBorderIcon />
            <BookmarkBorderIcon />
          </div>
          <div className="snsBottom">
            <InstagramIcon />
            <YouTubeIcon />
          </div>
        </div>
      </ClassProfileWrapper>
      <ClassPhoneNumber>
        연락처 :{' '}
        <span className="phoneNumber">
          {userData ? userData.phone_number : ''}
        </span>
      </ClassPhoneNumber>
      <ClassBasicInfo>
        레슨 기본 정보
        <RenderInfo infos={basicInfos} />
      </ClassBasicInfo>
      <ClassContent>
        본문
        <div className="contentBox">
          <div className="contentText">{content}</div>
        </div>
      </ClassContent>
    </ClassContainer>
  );
}
