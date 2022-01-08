import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { menuLists, subMenuLists, menuLinks, subMenuLinks } from './menuLists';
import { useState } from 'react';
import { useLoginUpdate } from '../../contexts/login';
import { instance } from '../../lib/api';
import * as Api from '../../lib/api';
import { ClassNames } from '@emotion/react';

export default function Menu() {
  const setLogin = useLoginUpdate();
  const [isSeen, setIsSeen] = useState(false);

  const user = localStorage.getItem('user');

  function dropBoxHandler(event: React.MouseEvent<HTMLDivElement>) {
    setIsSeen(!isSeen);
  }

  function logoutHandler(event: React.MouseEvent<HTMLLIElement>) {
    Api.logout()
      .then(res => {
        instance.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem('user');
        if (setLogin) setLogin(false);
      })
      .catch(err => console.log(err.response));
  }

  function stringAvatar(name: string) {
    if (name && name.length > 1)
      return {
        children: `${name.split('')[1]}${name.split('')[2]}`.toUpperCase(),
      };
  }

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
                <SubMenuContainer />
                <SubMenuListContainer>
                  <ul>
                    {subMenuLists[i].map((subMenu, j) => (
                      <SubMenuList>
                        <Link to={subMenuLinks[i][j]}>{subMenu}</Link>
                      </SubMenuList>
                    ))}
                  </ul>
                </SubMenuListContainer>
              </MainMenuContent>
            </MainMenuList>
          ))}
        </MenuLists>
        <AvartarContainer onClick={dropBoxHandler}>
          <Avatar sx={{ ml: 9 }} {...stringAvatar(user!)} />
          {isSeen && (
            <Dropbox>
              <ul>
                <DropboxContent onClick={logoutHandler}>logout</DropboxContent>
              </ul>
            </Dropbox>
          )}
        </AvartarContainer>
      </MenuInner>
    </MenuContainer>
  );
}

const MenuContainer = styled.header`
  min-width: 100%;
  position: fixed;
  background-color: white;
  height: 6.5rem;
  border-bottom: 1px solid rgb(206, 206, 206);
  box-shadow: 0 4px 4px -4px rgb(206, 206, 206);
  z-index: 100;
`;

const MenuInner = styled.div`
  display: flex;
  width: 110rem;
`;

const Logo = styled.h1`
  margin: 2rem 2rem 2rem 3rem;
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
      margin-top: 0.7rem;
      position: relative;
      height: 3px;
      weight: 100%;
      background-color: rgb(82, 111, 255);
    }
  }
`;

const MainMenuContent = styled.span`
  margin-top: 1rem;
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
  top: 6.6rem;
  left: 0;
  width: 100%;
  height: 6rem;
  font-size: 1.4rem;
  background-color: white;
  border-bottom: 1px solid rgb(239, 239, 239);
  box-shadow: 0 4px 4px -4px rgb(150, 148, 148);
  ${MainMenuList}:hover & {
    display: block;
  }
`;

const SubMenuListContainer = styled.div`
  display: none;
  ${MainMenuList}:hover & {
    display: block;
  }
  > ul {
    position: absolute;
    display: flex;
    width: 1000rem;
    margin: 4.5rem 0;
  }
`;

const SubMenuList = styled.li`
  margin-right: 3rem;

  &:hover {
    font-weight: 500;
    color: rgb(82, 111, 255);
  }
`;

const AvartarContainer = styled.div`
  position: fixed;
  top: 1.3rem;
  right: 3rem;
  cursor: pointer;
  @media (max-width: 65rem) {
    margin-left: 3rem;
    position: relative;
  }
`;

const Dropbox = styled.div`
  width: 10rem;
  background-color: darkgrey;
  border-radius: 0.3rem;
  }
`;

const DropboxContent = styled.li`
  font-size: 1.3rem;
  color: white;
  padding: 1rem;
  text-align: center;
`;
