import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material';

const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  &.Mui-selected {
    color: #1d3557;
  }
  background-color: #f1faee;
  color: #457b9d;
`);

export default function BottomMenu() {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
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
