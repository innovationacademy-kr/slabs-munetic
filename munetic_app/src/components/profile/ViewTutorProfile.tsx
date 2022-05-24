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
import { ITutorProfileData } from '../../types/tutorInfoData';

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
  .careerList {
    margin: 1rem 0;
    border-radius: 0.5rem;
    border: solid 1.5px;
    border-color: ${palette.lightgray};
    width: 100%;
    padding: 1rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
              category={lesson.Category.name || ''}
              title={lesson.title || ''}
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

export default function ViewTutorProfile() {
  const userId = useParams().id;
  const [userData, setUserData] = useState<IUserTable>();
  const [tutorData, setTutorData] = useState<ITutorProfileData>();

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
          const tutorProfile = await ProfileAPI.getTutorProfileById(
            userData?.id,
          );
          setTutorData({
            spec: tutorProfile.data.data.spec,
            career: tutorProfile.data.data.career
              ? JSON.parse(tutorProfile.data.data.career)
              : '',
            youtube: tutorProfile.data.data.youtube,
            instagram: tutorProfile.data.data.instagram,
            soundcloud: tutorProfile.data.data.soundcloud,
            tutor_introduction: tutorProfile.data.data.tutor_introduction,
          });
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
              instagramId={
                tutorData?.instagram === '' ? undefined : tutorData?.instagram
              }
              youtubeChannel={
                tutorData?.youtube === '' ? undefined : tutorData?.youtube
              }
              soundcloudId={
                tutorData?.soundcloud === '' ? undefined : tutorData?.soundcloud
              }
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
            <div className="infoName">튜터 소개</div>
            <div className="infoContent">{tutorData?.tutor_introduction}</div>
          </InfoWrapper>
          <InfoWrapper column>
            <div className="infoName">
              <div className="infoNameTextCol">학력</div>
            </div>
            <span className="specText">{tutorData?.spec}</span>
          </InfoWrapper>
          <InfoWrapper column>
            <div className="infoName">
              <div className="infoNameTextCol">경력사항</div>
            </div>
            {tutorData?.career ? (
              <ul className="careers">
                {tutorData.career.map(careerInfo => {
                  return (
                    careerInfo && (
                      <li className="careerList">
                        <span className="careerText">{careerInfo}</span>
                      </li>
                    )
                  );
                })}
              </ul>
            ) : (
              ''
            )}
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
