import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material';
import palette from '../../style/palette';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  &.Mui-selected {
    color: ${palette.darkBlue};
  }
  background-color: ${palette.green};
  color: ${palette.grayBlue};
`);

export default function BottomMenu() {
  const currentPath = useLocation().pathname;
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const onChangeMenu = (event: any, newValue: number) => {
    setValue(newValue);
    const paths = ['/', '/search', '/profile/manage', '/bookmark', '/setting'];
    navigate(paths[newValue], { replace: true });
  };

  useEffect(() => {
    if (currentPath.includes('/profile/')) {
      setValue(2);
    } //나머지 메뉴들 생기면 추가로 만들어줘야함
    else {
      setValue(0);
    }
  }, [currentPath]);

  return (
    <Box
      sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => onChangeMenu(event, newValue)}
      >
        <BottomNavigationAction label="홈" icon={<HomeIcon />} />
        <BottomNavigationAction label="검색" icon={<SearchIcon />} />
        <BottomNavigationAction label="프로필" icon={<AccountCircleIcon />} />
        <BottomNavigationAction label="북마크" icon={<BookmarkIcon />} />
        <BottomNavigationAction label="설정" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Box>
  );
}
