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
    ['게사물 조회 및 관리'],
    ['앱 가입 정책 관리', '회원 가입 양식', '오픈 소스 라이센스', '팝업 관리'],
    ['스토어 앱 버전 관리'],
    ['결제 내역 조회', '환불/취소 관리', '서비스 센터'],
    ['푸쉬 보내기', '푸쉬 히스토리'],
  ];

  const menuLink = ['/users', '/posts', '', '', '', ''];

  return (
    <MenuContainer>
      <Wrapper>
        <Logo>
          <Link to="/">Munetic</Link>
        </Logo>
        <MenuList>
          {menuLists.map((menu, i) => (
            <li>
              <span>
                <Link to={menuLink[i]}>{menu}</Link>
              </span>
              <SubMenuList content={i + 1}>
                <ul>
                  {subMenuLists[i].map(subMenu => (
                    <li key={i}>{subMenu}</li>
                  ))}
                </ul>
              </SubMenuList>
            </li>
          ))}
        </MenuList>
      </Wrapper>
    </MenuContainer>
  );
}

const MenuContainer = styled.header`
  min-width: 100vw;
  position: fixed;
  border-bottom: 1px solid rgb(239, 239, 239);
  z-index: 100;
`;

const Wrapper = styled.div`
  height: 3.71rem;
  display: flex;
  width: 68rem;
`;

const Logo = styled.h1`
  margin: 1rem 2rem 1rem 3rem;
  a {
    font-size: 1.3rem;
    font-weight: 700;
    color: rgb(82, 111, 255);
  }
`;

const MenuList = styled.ul`
  display: flex;
  > li {
    padding: 0 1rem;
    font-size: 0.8rem;
    &:hover {
      &::after {
        content: '';
        display: block;
        margin-top: -2px;
        position: relative;
        height: 3px;
        weight: 100%;
        background-color: rgb(82, 111, 255);
      }
      span a {
        font-weight: 500;
        color: rgb(82, 111, 255);
      }
      cursor: pointer;
    }
    span {
      display: block;
      padding: 1.5rem 0.5rem;
      a {
        color: rgb(34, 34, 34);
      }
    }
  }
`;

const SubMenuList = styled.div<{ content: number }>`
  background-color: white;
  font-size: 0.7rem;
  position: fixed;
  top: 3.73rem;
  left: 0px;
  display: none;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: ${props => 10 + props.content ** 2}rem;
  border-bottom: 1px solid rgb(239, 239, 239);
  width: 100%;
  ${MenuList} li:hover > & {
    display: block;
  }
  ul {
    display: flex;
    li {
      padding-right: 3rem;
      &:hover {
        font-weight: 500;
        color: rgb(82, 111, 255);
      }
    }
  }
`;
