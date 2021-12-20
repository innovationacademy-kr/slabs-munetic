import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Menu() {
  const menuLists = [
    '회원 관리',
    '게시물 관리',
    '서비스 관리',
    '버전 관리',
    '결제 관리',
    '푸쉬 관리',
  ];

  const subMenuLists = [
    ['회원 조회 및 관리'],
    ['게시물 조회 및 관리'],
    ['앱 가입 정책 관리', '회원 가입 양식', '오픈 소스 라이센스', '팝업 관리'],
    ['스토어 앱 버전 관리'],
    ['결제 내역 조회', '환불/취소 관리', '서비스 센터'],
    ['푸쉬 보내기', '푸쉬 히스토리'],
  ];

  const menuLinks = ['/users', '/posts', '', '', '', ''];

  return (
    <MenuContainer>
      <MenuInner>
        <Logo>
          <Link to="/">Munetic</Link>
        </Logo>
        <MenuLists>
          {menuLists.map((menu, i) => (
            <MainMenuList key={i}>
              <MainMenuContent>
                <Link to={menuLinks[i]}>{menu}</Link>
                <SubMenuContainer>
                  <ul>
                    {subMenuLists[i].map(subMenu => (
                      <SubMenuList>{subMenu}</SubMenuList>
                    ))}
                  </ul>
                </SubMenuContainer>
              </MainMenuContent>
            </MainMenuList>
          ))}
        </MenuLists>
      </MenuInner>
    </MenuContainer>
  );
}

const MenuContainer = styled.header`
  min-width: 100vw;
  position: fixed;
  border-bottom: 1px solid rgb(239, 239, 239);
  z-index: 100;
`;

const MenuInner = styled.div`
  display: flex;
  width: 110rem;
`;

const Logo = styled.h1`
  margin: 1rem 2rem 1rem 3rem;
  a {
    font-size: 2.5rem;
    font-weight: 700;
    color: rgb(82, 111, 255);
  }
`;

const MenuLists = styled.ul`
  display: flex;
`;

const MainMenuList = styled.li`
  padding: 0 2.5rem;
  font-size: 1.5rem;
  &:hover {
    &::after {
      content: '';
      display: block;
      margin-top: -0.25rem;
      position: relative;
      height: 3px;
      weight: 100%;
      background-color: rgb(82, 111, 255);
    }
  }
`;

const MainMenuContent = styled.span`
  position: relative;
  display: block;
  padding: 1.5rem 0.5rem;
  cursor: pointer;
  a {
    color: rgb(34, 34, 34);
  }
  ${MainMenuList}:hover a {
    font-weight: 500;
    color: rgb(82, 111, 255);
  }
`;

const SubMenuContainer = styled.div`
  position: fixed;
  display: none;
  top: 4.65rem;
  left: 0;
  width: 100%;
  font-size: 1.4rem;
  padding: 1.4rem 0;
  background-color: white;
  border-bottom: 1px solid rgb(239, 239, 239);
  ${MainMenuList}:hover & {
    display: block;
  }
  > ul {
    padding-left: 14.7rem;
    display: flex;
  }
`;

const SubMenuList = styled.li`
  padding: 1rem 3rem;
  &:hover {
    font-weight: 500;
    color: rgb(82, 111, 255);
  }
`;
