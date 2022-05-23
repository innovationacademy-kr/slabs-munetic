import styled from 'styled-components';
import palette from '../../style/palette';
import { useEffect, useState, useContext } from 'react';
import { IUserTable } from '../../types/userData';
import * as ProfileAPI from '../../lib/api/profile';
import * as AuthAPI from '../../lib/api/auth';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import logout from '../../lib/auth/logout';
import ViewAllCommentByUser from '../comment/ViewAllCommentByUser';
import SwitchWithLabel from '../ui/SwitchWithLabel';
import { Account } from '../../types/enums';
import Contexts from '../../context/Contexts';

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
    margin: 15px;
    padding: 5px 0px;
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
  width: 100px;
  height: 35px;
  border-radius: 5px;
  margin-left: 5px;
  .buttonText {
    width: 100px;
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
  const [userData, setUserData] = useState<IUserTable>();
  const { actions } = useContext(Contexts);

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

  const onClickLogout = async () => {
    logout();
    actions.setLoggedin(false);
    navigate('/');
  };

  const changeAccount = async (changeTo: boolean) => {
    const res = await AuthAPI.changeAccount(
      userData?.type === 'Student' ? 'Tutor' : 'Student',
    );
    let new_userData = { ...userData } as IUserTable;
    if (userData) {
      new_userData.type =
        userData.type === 'Student' ? Account.Tutor : Account.Student;
      setUserData(new_userData);
    }
    return res.data.data || false;
  };

  const Label = styled.div`
    font-family: 'Roboto', 'Arial', sans-serif;
    font-size: 1.3rem;
    line-height: 2.2rem;
    font-weight: 400;
    margin-left: 10px;
    padding: 0;
    border: 0;
    background: transparent;
  `;

  return (
    <div>
      {!userData ? (
        'loading'
      ) : (
        <Container>
          <Label>
            {userData.TutorInfo ? (
              <SwitchWithLabel
                init={userData.type !== 'Student'}
                label={`${
                  userData.type === 'Student' ? '선생님' : '학생'
                } 계정으로 변경`}
                change={changeAccount}
              />
            ) : (
              <ChangeTypeButton>
                <Link to="/auth/register?tutor=tutor">튜터 등록</Link>
              </ChangeTypeButton>
            )}
          </Label>
          <ProfileWrapper>
            <div className="imgAndNickname">
              <img className="profileImg" src={userData.image_url} alt="" />
              <div className="nickname">
                <Link to={`/profile/${userData.id}`}>{userData.nickname}</Link>
              </div>
            </div>
            <div className="sns">
              <StyledEditButton to={`/profile/edit/${userData.id}`}>
                프로필 수정
              </StyledEditButton>
              <StyledEditButton to={`/profile/likes`}>
                관심있는 강의
              </StyledEditButton>
              <StyledEditButton onClick={onClickLogout}>
                로그아웃
              </StyledEditButton>
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
          <Label>작성한 댓글</Label>
          <ViewAllCommentByUser userId={userData.login_id as string} />
        </Container>
      )}
    </div>
  );
}
