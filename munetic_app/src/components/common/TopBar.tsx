import styled from 'styled-components';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import palette from '../../style/palette';
import { useContext } from 'react';
import Contexts from '../../context/Contexts';

const TopBarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${palette.darkBlue};
  position: sticky;
  top: 0;
  z-index: 99;
  .topBarWrapper {
    height: 100%;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .topBarIconContainer {
    position: relative;
    cursor: pointer;
  }
  .topBarIcon {
    color: ${palette.ivory};
  }
  .topBarIconText {
    width: 15px;
    height: 15px;
    position: absolute;
    top: -3px;
    left: 10px;
    background-color: ${palette.red};
    color: ${palette.ivory};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }
  .logo {
    font-weight: bold;
    font-size: 26px;
    color: ${palette.ivory};
    cursor: pointer;
    line-height: 53px;
  }
  .topBarLeft {
    flex: 3;
  }
  .topBarCenter {
    flex: 4;
    text-align: center;
    height: 50px;
  }
  .topBarRight {
    flex: 3;
    text-align: right;
  }
  .topBarRightText {
    color: ${palette.ivory};
    font-size: 15px;
    font-weight: bold;
  }
  .topBarLeftText {
    color: ${palette.ivory};
    font-size: 15px;
    font-weight: bold;
  }
`;

export default function TopBar() {
  const { actions } = useContext(Contexts);

  //home에선 푸쉬알림&공백, 수정에선 Back&저장, 등록에선 Back&등록, 나머지는 Back&공백
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  let rightText: string;
  if (currentPath === '/') {
    rightText = '';
  } else if (currentPath.includes('edit')) {
    rightText = '저장';
  } else if (currentPath === '/lesson/write') {
    rightText = '등록';
  } else if (currentPath.includes('/lesson/write/')) {
    rightText = '수정';
  } else if (currentPath.includes('/auth')) {
    return null;
  } else {
    rightText = '';
  }
  const onClickWrite = (rightText: string) => {
    if (rightText === '등록' || rightText === '수정') {
      actions.setWrite(true);
    }
  };

  return (
    <TopBarContainer>
      <div className="topBarWrapper">
        <div className="topBarLeft">
          {currentPath === '/' ? (
            <div className="topBarIconContainer">
              <NotificationsNoneIcon className="topBarIcon" />
              <span className="topBarIconText">2</span>
            </div>
          ) : (
            <span className="topBarLeftText" onClick={() => navigate(-1)}>
              Back
            </span>
          )}
        </div>
        <div className="topBarCenter">
          <Link to="/">
            <span className="logo">MUNETIC</span>
          </Link>
        </div>
        <div className="topBarRight">
          <span
            className="topBarRightText"
            onClick={() => onClickWrite(rightText)}
          >
            {rightText}
          </span>
        </div>
      </div>
    </TopBarContainer>
  );
}
