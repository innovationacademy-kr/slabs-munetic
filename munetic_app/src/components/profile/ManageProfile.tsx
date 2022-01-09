import styled from 'styled-components';
import palette from '../../style/palette';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useEffect, useState } from 'react';
import { UserDataType } from '../../types/userData';
import * as ProfileAPI from '../../lib/api/profile';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  margin: 30px 0;
`;

const ProfileWrapper = styled.div`
  display: flex;
  background-color: ${palette.green};
  justify-content: space-between;
  margin: 10px;
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
    align-items: center;
    margin: 10px;
  }
`;

const WriteBtnWrapper = styled.div`
  padding: 20px 30px;
`;

const StyledButton = styled(Button)`
  ::before {
    padding-top: 50%;
  }
`;

const StyledEditButton = styled(Button)`
  background-color: white;
  font-size: 16px;
  width: 70px;
  height: 35px;
  border-radius: 5px;
  margin-left: 5px;
  .buttonText {
    margin: 0;
    color: ${palette.darkBlue};
  }
`;

const ChangeTypeButton = styled.div`
  text-align: right;
  margin-right: 10px;
`;

const Separater = styled.div`
  margin: 30px 0;
  border-bottom: 1px solid ${palette.darkBlue};
`;

export default function ManageProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataType>();

  useEffect(() => {
    async function getMyProfile() {
      try {
        const userProfile = await ProfileAPI.getMyProfile();
        setUserData(userProfile.data.data);
      } catch (e) {
        console.log(e, '내 프로필을 불러오지 못했습니다.');
        navigate('/auth/login');
      }
    }
    getMyProfile();
  }, []);

  return (
    <div>
      {!userData ? (
        'loading'
      ) : (
        <Container>
          {userData.type === 'Student' ? (
            <ChangeTypeButton>
              <Link to="/auth/register?tutor=tutor">선생님 계정으로 변경</Link>
            </ChangeTypeButton>
          ) : (
            ''
          )}
          <ProfileWrapper>
            <div className="imgAndNickname">
              <img className="profileImg" src={userData.image_url} alt="" />
              <div className="nickname">
                <Link to={`/profile/${userData.id}`}>{userData.nickname}</Link>
              </div>
            </div>
            <div className="sns">
              <StyledEditButton to={`/profile/edit/${userData.id}`}>
                수정
              </StyledEditButton>
              <div className="snsBottom">
                <InstagramIcon />
                <YouTubeIcon />
              </div>
            </div>
          </ProfileWrapper>
          <Separater />
          {userData.type === 'Tutor' ? (
            <>
              <WriteBtnWrapper>
                <StyledButton to="/lesson/manage">
                  레슨 등록 & 수정
                </StyledButton>
              </WriteBtnWrapper>
              <Separater />
            </>
          ) : (
            ''
          )}
        </Container>
      )}
    </div>
  );
}
