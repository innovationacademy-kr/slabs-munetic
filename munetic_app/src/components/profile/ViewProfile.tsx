import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserDataType } from '../../types/userData';
import * as ProfileAPI from '../../lib/api/profile';
import * as LessonAPI from '../../lib/api/lesson';
import styled from 'styled-components';
import palette from '../../style/palette';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { LessonData } from '../../types/lessonData';
import Pagination from '../common/Pagination';
import { LessonItem } from '../lesson/lessonlist/LessonItem';

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
    display: flex;
    justify-content: right;
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
  const [classes, setClasses] = useState<LessonData[]>();
  const [classCount, setClassCount] = useState(0);
  const itemsPerPage = 5;

  const handlePageClick = async (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % classCount;
    try {
      const res = await LessonAPI.getLessonByUserId(
        userId,
        itemsPerPage,
        newOffset,
      );
      setClasses(res.data.data.rows);
    } catch (e) {
      console.log(e, '레슨을 불러오지 못했습니다.');
    }
  };

  useEffect(() => {
    async function getUserLessons(id: number, limit: number, offset: number) {
      try {
        const res = await LessonAPI.getLessonByUserId(id, limit, offset);
        setClasses(res.data.data.rows);
        setClassCount(res.data.data.count);
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
              lesson_id={lesson.lesson_id}
              category={lesson.editable.category}
              title={lesson.editable.title}
              key={lesson.lesson_id}
              image_url={lesson.image_url}
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
  const [userData, setUserData] = useState<UserDataType>();

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

  return (
    <>
      {!userData ? (
        'loading'
      ) : (
        <Container>
          <img className="img" src={userData.image_url} alt="" />
          <div className="nickname">{userData.nickname}</div>
          <div className="sns">
            <InstagramIcon />
            <YouTubeIcon />
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
