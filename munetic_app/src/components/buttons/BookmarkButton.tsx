import { useEffect, useState } from 'react';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';

/**
 * 북마크 버튼 컴포넌트입니다. 서버와의 비동기 통신으로 강의에 대한 북마크 여부 및 북마크 상태를 업데이트 합니다.
 * 
 * @returns 리액트 앨리먼트
 * @author joohongpark
 */
export default function BookmarkButton() {
  const [bookmark, setBookmark] = useState<boolean>(false);

  return (
    <IconButton color="inherit" onClick={() => setBookmark(!bookmark)}>
      {bookmark ? <Bookmark /> : <BookmarkBorder />}
    </IconButton>
  );
}