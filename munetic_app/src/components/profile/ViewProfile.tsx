import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUserTable } from '../../types/userData';
import * as ProfileAPI from '../../lib/api/profile';
import styled from 'styled-components';
import palette from '../../style/palette';
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
`;

export default function ViewProfile() {
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
            youtube: tutorProfile.data.data.youtube,
            instagram: tutorProfile.data.data.instagram,
            soundcloud: tutorProfile.data.data.soundcloud,
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
            <div className="infoName">자기 소개</div>
            <div className="infoContent">{userData.introduction}</div>
          </InfoWrapper>
        </Container>
      )}
    </>
  );
}
