import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IUserTable } from '../../types/userData';
import * as ProfileAPI from '../../lib/api/profile';
import * as AuthAPI from '../../lib/api/auth';
import styled from 'styled-components';
import palette from '../../style/palette';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ToggleBtn from '../common/ToggleBtn';
import Button from '../common/Button';
import Contexts from '../../context/Contexts';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import styles from './EditTutorProfile.module.css';

const Container = styled.div`
  margin: 30px 10px 60px 10px;
  padding: 10px;
  background-color: ${palette.green};
  .imgWrapper {
    position: relative;
  }
  .img {
    display: block;
    margin: 0 auto;
    width: 130px;
    height: 130px;
    align-items: center;
    border-radius: 50%;
  }
  .imgLabel {
    position: absolute;
    left: 62%;
    top: 80%;
    width: 30px;
    text-align: center;
    background-color: ${palette.ivory};
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 1px 1px, rgba(0, 0, 0, 0.23) 0px 1px 1px;
  }
  .sns {
    display: flex;
    justify-content: right;
  }
  .nicknameMessage {
    color: ${palette.red};
    font-size: 12px;
    text-align: center;
  }
`;

interface NicknameWrapperProps {
  editable?: boolean;
}

const NicknameWrapper = styled.div<NicknameWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 15px 5px 15px;
  text-align: center;
  font-size: 21px;
  font-weight: bold;
  color: ${palette.darkBlue};
  .nicknameText {
    ${({ editable }) =>
      editable
        ? `border: 1px solid ${palette.grayBlue}; border-radius: 5px; padding: 2px`
        : null};
    outline: none;
  }
`;

const StyledBtnIntro = styled(Button)`
  ::before {
    padding-top: 50%;
  }
  background-color: ${palette.ivory};
  font-size: 13px;
  width: 55px;
  height: 25px;
  border-radius: 5px;
  margin-left: 5px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 2px 2px, rgba(0, 0, 0, 0.23) 0px 2px 2px;
  .buttonText {
    width: 100%;
    margin: 0;
    color: gray;
    font-weight: 500;
  }
`;

interface InfoNameProps {
  column?: boolean;
  editable?: boolean;
}

const InfoWrapper = styled.div<InfoNameProps>`
  background-color: ${palette.ivory};
  padding: 10px 20px;
  margin: 10px 0;
  display: flex;
  ${({ column }) => (column ? null : 'align-items: center')};
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  color: ${palette.darkBlue};
  word-wrap: break-word;
  .infoName {
    display: flex;
    align-items: center;
    flex: 1 0 0;
    font-size: 18px;
    color: ${palette.grayBlue};
    ${({ column }) => (column ? 'margin-bottom: 10px' : null)};
    .infoNameTextCol {
      flex: 1 0 0;
    }
  }
  .infoContent {
    font-size: 18px;
    outline: none;
    ${({ editable }) =>
      editable
        ? `border: 1px solid ${palette.grayBlue}; border-radius: 5px;`
        : null};
  }
  .careers {
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
  .careerText {
    font-size: 18px;
    margin-right: 1rem;
  }

  .careerDeleteBtn,
  .careerAddBtn {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: none;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
  }

  .careerDeleteBtn {
    background-color: ${palette.orange};
    color: ${palette.white};
  }
  .careerAddBtn {
    background-color: ${palette.banana};
    margin: auto;
  }

  .careerDeleteBtn:hover,
  .careerAddBtn:hover {
    transform: scale(1.1);
  }
`;

export default function EditTutorProfile() {
  const userId = useParams().id;
  const navigate = useNavigate();
  console.log('check it sound');
  const [userData, setUserData] = useState<IUserTable>({
    type: 'Student',
    login_id: '42kunlee',
    login_password:
      '$2b$10$fO/O6fF5w1HDkXNab8AMBOYE/9ByW8/sjIeXpQONQgJxkegxdFDIq',
    nickname: 'kunlee',
    name: '쿠운리',
    name_public: true,
    gender: 'Male',
    birth: 940302,
    email: '42.kunlee@gmail.com',
    phone_number: '010-1234-1234',
    phone_public: true,
    image_url: '/img/basicProfileImg.png',
    introduction: '안녕하세요. kunlee입니다. 반가워요',
    // createdAt: Sequelize.fn('now'),
    // updatedAt: Sequelize.fn('now'),
  });
  const [nicknameValue, setNicknameValue] = useState('');
  const [namePublicValue, setNamePublicValue] = useState<boolean>();
  const [phonePublicValue, setPhonePublicValue] = useState<boolean>();
  const [imageValue, setImageValue] = useState('');
  const [introValue, setIntroValue] = useState('');
  const [isEditIntro, setIsEditIntro] = useState<boolean>(false);
  const [isEditNickname, setIsEditNickname] = useState<boolean>(false);
  const [isNicknameChanged, setIsNicknameChanged] = useState<boolean>(false);
  const [nicknameMessage, setNicknameMessage] = useState('');

  const [careerValue, setCareerValue] = useState<Array<string>>(
    userData?.career ? userData.career : ['서울예대', '학원 강사 3년'],
  );

  const { state, actions } = useContext(Contexts);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeToggleName = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean,
  ) => {
    setNamePublicValue(newAlignment);
  };

  const onChangeTogglePhone = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean,
  ) => {
    setPhonePublicValue(newAlignment);
  };

  const onClickEditIntroBtn = () => {
    setIsEditIntro(!isEditIntro);
  };

  const onClickAddCareer = () => {
    console.log('click');
  };

  const onClickEditNicknameBtn = async () => {
    if (!isNicknameChanged) {
      setIsEditNickname(!isEditNickname);
      setNicknameMessage('');
    } else {
      try {
        await AuthAPI.isValidInfo(`nickname=${nicknameValue}`);
        setIsNicknameChanged(false);
        setNicknameMessage('사용 가능한 닉네임입니다.');
      } catch (e) {
        console.log(e, '중복된 닉네임이 존재합니다.');
        setNicknameMessage('이미 존재하는 닉네임입니다.');
      }
    }
  };

  const onEditIntro = (e: React.FormEvent<HTMLDivElement>) => {
    if (e.currentTarget.textContent) {
      setIntroValue(e.currentTarget.textContent);
    }
  };

  const onEditNickname = (e: React.FormEvent<HTMLDivElement>) => {
    if (e.currentTarget.textContent) {
      setNicknameValue(e.currentTarget.textContent);
      if (e.currentTarget.textContent === userData?.nickname) {
        setIsNicknameChanged(false);
        setNicknameMessage('');
      } else {
        setIsNicknameChanged(true);
      }
    }
  };

  const onChangeProfileImg = async (e: any) => {
    try {
      const formData = new FormData();
      formData.append('img', e.target.files[0]);
      const res = await ProfileAPI.createProfileImg(formData);
      const newImageUrl = `/img/${res.data.data}`;
      setImageValue(newImageUrl);
    } catch (e) {
      console.log(e, '프로필 사진 변경에 실패하였습니다.');
    }
  };

  useEffect(() => {
    async function getProfile() {
      try {
        const userProfile = await ProfileAPI.getProfileById(Number(userId));
        setUserData(userProfile.data.data);
        setNicknameValue(userProfile.data.data.nickname);
        setNamePublicValue(userProfile.data.data.name_public);
        setPhonePublicValue(userProfile.data.data.phone_public);
        setImageValue(userProfile.data.data.image_url);
        setIntroValue(userProfile.data.data.introduction);
      } catch (e) {
        console.log(e, '프로필을 불러오지 못했습니다.');
      }
    }
    // getProfile();
  }, []);

  useEffect(() => {
    async function UpdateProfile() {
      if (state.write) {
        if (!isEditNickname && !isNicknameChanged && !isEditIntro) {
          try {
            const newData = {
              nickname: nicknameValue,
              name_public: namePublicValue,
              phone_public: phonePublicValue,
              image_url: imageValue,
              introduction: introValue,
            };
            await ProfileAPI.updateProfile(newData);
            actions.setWrite(false);
            navigate(`/profile/${userData?.id}`, { replace: true });
          } catch (e) {
            console.log(e, '프로필 업데이트가 실패하였습니다.');
          }
        }
        actions.setWrite(false);
      }
    }
    // UpdateProfile();
  }, [state]);

  return (
    <>
      {!userData ? (
        'loading'
      ) : (
        <Container>
          <div className="imgWrapper">
            <img className="img" src={imageValue} alt="" />
            <label
              className="imgLabel"
              onClick={() => (inputRef.current ? inputRef.current.click() : '')}
            >
              <AddPhotoAlternateOutlinedIcon />
            </label>
            <input
              type="file"
              onChange={onChangeProfileImg}
              ref={inputRef}
              style={{ display: 'none' }}
            />
          </div>
          <NicknameWrapper editable={isEditNickname}>
            <div
              className="nicknameText"
              contentEditable={isEditNickname}
              suppressContentEditableWarning
              onInput={e => {
                isEditNickname ? onEditNickname(e) : null;
              }}
            >
              {userData.nickname}
            </div>
            <StyledBtnIntro onClick={onClickEditNicknameBtn}>
              {isNicknameChanged
                ? '중복 체크'
                : isEditNickname
                ? '완료'
                : '수정'}
            </StyledBtnIntro>
          </NicknameWrapper>
          <div className="nicknameMessage">
            {!isNicknameChanged && isEditNickname ? nicknameMessage : ''}
          </div>
          <div className="sns">
            <InstagramIcon />
            <YouTubeIcon />
          </div>
          <InfoWrapper>
            <div className="infoName">이름</div>
            <div className="infoContent">{userData.name}</div>
            <ToggleBtn
              first="공개"
              second="비공개"
              value={namePublicValue}
              handleChange={onChangeToggleName}
            />
          </InfoWrapper>
          <InfoWrapper>
            <div className="infoName">연락처</div>
            <div className="infoContent">{userData.phone_number}</div>
            <ToggleBtn
              first="공개"
              second="비공개"
              value={phonePublicValue}
              handleChange={onChangeTogglePhone}
            />
          </InfoWrapper>
          <InfoWrapper column editable={isEditIntro}>
            <div className="infoName">
              <div className="infoNameTextCol">소개</div>
              <StyledBtnIntro onClick={onClickEditIntroBtn}>
                {isEditIntro ? '완료' : '수정'}
              </StyledBtnIntro>
            </div>
            <div
              className="infoContent"
              contentEditable={isEditIntro}
              suppressContentEditableWarning
              onInput={e => {
                isEditIntro ? onEditIntro(e) : null;
              }}
            >
              {userData.introduction}
            </div>
          </InfoWrapper>
          <InfoWrapper column editable={isEditIntro}>
            <div className="infoName">
              <div className="infoNameTextCol">경력사항</div>
            </div>
            <ul className="careers">
              {careerValue.map((careerInfo, idx) => {
                return (
                  <li className="careerList">
                    <span className="careerText">{careerInfo}</span>
                    <button className="careerDeleteBtn">−</button>
                  </li>
                );
              })}
            </ul>
            <button className="careerAddBtn" onClick={onClickAddCareer}>
              +
            </button>
          </InfoWrapper>
        </Container>
      )}
    </>
  );
}
