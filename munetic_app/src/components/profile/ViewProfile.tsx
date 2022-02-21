import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUserTable } from '../../types/userData';
import * as ProfileAPI from '../../lib/api/profile';
import * as LessonAPI from '../../lib/api/lesson';
import styled from 'styled-components';
import palette from '../../style/palette';
import { ILessonData } from '../../types/lessonData';
import Pagination from '../common/Pagination';
import { LessonItem } from '../lesson/lessonlist/LessonItem';
import SnsButtons from '../ui/SnsButtons';
import { ITutorInfoData } from '../../types/tutorInfoData';

const Container = styled.div`
  margin: 30px 10px 60px 10px;
  padding: 10px;
  background-color: ${palette.green};
  .img {
    display: block;
    margin: 0 auto;
    width: 130px;
    height: 130px;
    align-items: center;
    border-radius: 50%;
  }
  .nickname {
    margin: 15px;
    text-align: center;
    font-size: 21px;
    font-weight: bold;
    color: ${palette.darkBlue};
  }
  .sns {
    text-align: right;
  }
`;

interface InfoNameProps {
  column?: boolean;
}

const InfoWrapper = styled.div<InfoNameProps>`
  background-color: ${palette.ivory};
  padding: 10px 20px;
  margin: 10px 0;
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  color: ${palette.darkBlue};
  word-wrap: break-word;
  .infoName {
    flex: 1 0 0;
    font-size: 18px;
    color: ${palette.grayBlue};
    ${({ column }) => (column ? 'margin-bottom: 10px' : null)};
  }
  .infoContent {
    font-size: 18px;
  }
`;

interface UserClassListProps {
  userId: number;
}

const UserClassList = ({ userId }: UserClassListProps) => {
  const [classes, setClasses] = useState<ReadonlyArray<ILessonData>>();
  const [classCount, setClassCount] = useState<number>(0);
  const itemsPerPage = 5;

  const handlePageClick = async (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % classCount;
    try {
      const res = await LessonAPI.getLessonByUserId(
        userId,
        itemsPerPage,
        newOffset,
      );
      setClasses(res.data.data);
    } catch (e) {
      console.log(e, '레슨을 불러오지 못했습니다.');
    }
  };

  useEffect(() => {
    async function getUserLessons(id: number, limit: number, offset: number) {
      try {
        const res = await LessonAPI.getLessonByUserId(id, limit, offset);
        setClasses(res.data.data);
        setClassCount(res.data.data.length);
      } catch (e) {
        console.log(e, '레슨을 불러오지 못했습니다.');
      }
    }
    getUserLessons(userId, itemsPerPage, 0);
  }, []);

  return (
    <>
      <div className="classList">
        {classes &&
          classes.map(lesson => (
            <LessonItem
              lesson_id={lesson.id}
              category={lesson.Category.name || ""}
              title={lesson.title || ""}
              key={lesson.id}
              image_url={lesson.User.image_url}
              />
          ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        classCount={classCount}
        handlePageClick={e => handlePageClick(e)}
      />
    </>
  );
};

export default function ViewProfile() {
  const userId = useParams().id;
  const [userData, setUserData] = useState<IUserTable>();
  const [tutorData, setTutorData] = useState<ITutorInfoData>();

  useEffect(() => {
    async function getProfile() {
      try {
        const userProfile = await ProfileAPI.getProfileById(Number(userId));
        setUserData(userProfile.data.data);
      } catch (e) {
        console.log(e, '프로필을 불러오지 못했습니다.');
      }
    }
    getProfile();
  }, []);

  useEffect(() => {
    async function getTutorProfile() {
      try {
        if (userData?.type === 'Tutor') {
          const userProfile = await ProfileAPI.getTutorProfileById(userData?.id);
          setTutorData(userProfile.data.data);
        }
      } catch (e) {
        console.log(e, '튜터 프로필을 불러오지 못했습니다.');
      }
    }
    getTutorProfile();
  }, [userData]);

  return (
    <>
      {!userData ? (
        'loading'
      ) : (
        <Container>
          <img className="img" src={userData.image_url} alt="" />
          <div className="nickname">{userData.nickname}</div>
          <div className="sns">
            <SnsButtons
              instagramId={tutorData?.instagram}
              youtubeChannel={tutorData?.youtube}
              soundcloudId={tutorData?.soundcloud}
            />
          </div>
          {userData.name_public ? (
            <InfoWrapper>
              <div className="infoName">이름</div>
              <div className="infoContent">{userData.name}</div>
            </InfoWrapper>
          ) : (
            ''
          )}
          {userData.phone_public ? (
            <InfoWrapper>
              <div className="infoName">연락처</div>
              <div className="infoContent">{userData.phone_number}</div>
            </InfoWrapper>
          ) : (
            ''
          )}
          <InfoWrapper column>
            <div className="infoName">소개</div>
            <div className="infoContent">{userData.introduction}</div>
          </InfoWrapper>
          <InfoWrapper column>
            <div className="infoName">튜터 정보</div>
            <div className="infoContent">
              {/* TODO: 추후에 경력 세밀화 할 때 리팩터링 해야함 */}
              강사 정보<br />
              <div>학력 : {tutorData?.spec || '없음'}</div>
              <div>경력 : {tutorData?.career || '없음'}</div>
            </div>
          </InfoWrapper>
          {userData.type === 'Tutor' ? (
            <InfoWrapper column>
              <div className="infoName">작성한 레슨 목록</div>
              <UserClassList userId={userData.id} />
            </InfoWrapper>
          ) : (
            ''
          )}
        </Container>
      )}
    </>
  );
}
