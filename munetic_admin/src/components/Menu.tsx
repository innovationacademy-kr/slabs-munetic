import styled from 'styled-components';
import { styled as styled_mui } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const MenuContainer = styled.header`
  width: 100%;
  height: 100%;
  background-color: ${props => props.color || 'black'};
  color: white;
`;

const SubMenuContainer = styled.div`
  background-color: grey;
  padding: 10px 10px;
  display: none;
  &: hover {
    display: block;
  }
`;

const MenuText = styled.div`
  display: inline-block;
  background-color: black;
  padding: 10px 10px;
  &:hover {
    background-color: grey;
    color: black;
    ~ ${SubMenuContainer} {
      display: block;
    }
  }
`;

const Item = styled_mui(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MenuList = styled.ul`
  display: block;
  text-align: center;
  font-size: 13px;
  li {
    padding-top: 6px;
  }
`;

export default function Menu() {
  return (
    <MenuContainer>
      <MenuText>My 메뉴</MenuText>
      <SubMenuContainer>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Item>
              <Link to="/users">회원관리</Link>
              <MenuList>
                <li>게시물 조회 및 관리</li>
              </MenuList>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <Link to="/posts">게시물 관리</Link>
              <MenuList>
                <li>게시물 조회 및 관리</li>
              </MenuList>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              서비스 관리
              <MenuList>
                <li>앱 가입 정책 관리</li>
                <li>회원 가입 양식</li>
                <li>오픈 소스 라이센스</li>
                <li>팝업 관리</li>
              </MenuList>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              버전 관리
              <MenuList>
                <li>앱 버전 조회</li>
              </MenuList>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              결제 관리
              <MenuList>
                <li>결제 내역 조회</li>
                <li>환불 취소 관리</li>
                <li>서비스 센터</li>
              </MenuList>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              푸쉬 관리
              <MenuList>
                <li>푸쉬 히스토리</li>
                <li>푸쉬 보내기</li>
              </MenuList>
            </Item>
          </Grid>
        </Grid>
      </SubMenuContainer>
    </MenuContainer>
  );
}
