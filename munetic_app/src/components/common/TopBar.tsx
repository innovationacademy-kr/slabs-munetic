import styled from 'styled-components';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const TopBarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: #0168fa;
  postion: sticky;
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
    color: #00f8b6;
  }
  .topBarIconText {
    width: 15px;
    height: 15px;
    position: absolute;
    top: -3px;
    left: 10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }
  .logo {
    font-weight: bold;
    font-size: 26px;
    color: #00f8b6;
    cursor: pointer;
    line-height: 55px;
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
    color: #00f8b6;
    font-size: 13px;
  }
`;

export default function TopBar() {
  //home에선 푸쉬알림, 수정에선 저장, 등록에선 등록, 나머지는 공백
  return (
    <TopBarContainer>
      <div className="topBarWrapper">
        <div className="topBarLeft">
          <div className="topBarIconContainer">
            <NotificationsNoneIcon className="topBarIcon" />
            <span className="topBarIconText">2</span>
          </div>
        </div>
        <div className="topBarCenter">
          <span className="logo">MUNETIC</span>
        </div>
        <div className="topBarRight">
          <span className="topBarRightText">저장</span>
        </div>
      </div>
    </TopBarContainer>
  );
}
