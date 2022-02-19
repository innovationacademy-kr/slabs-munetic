import { useEffect, useState } from 'react';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as BookmarkAPI from '../../lib/api/bookmark';

/**
 * 서버와의 비동기 통신으로 북마크 상태를 가져오는 함수입니다.
 * 
 * @param lesson_id number 강의 ID
 * @returns boolean 북마크 여부
 * @author joohongpark
 */
async function getBookmark(lesson_id: number): Promise<boolean> {
  if (Number.isNaN(lesson_id))
    return false;
  try {
    const res = await BookmarkAPI.getLessonBookmark(lesson_id);
    return res.data.data;
  } catch (e) {
    console.log(e, '좋아요 정보를 가져오는 데 오류가 발생했습니다.');
    return false;
  }
}

/**
 * 서버와의 비동기 통신으로 북마크 상태를 반영하는 함수입니다.
 * 
 * @param lesson_id number 강의 ID
 * @param bookmark boolean 북마크 여부
 * @returns boolean 반영 여부
 * @author joohongpark
 */
async function ToggleBookmark(lesson_id: number, bookmark: boolean): Promise<boolean> {
  if (Number.isNaN(lesson_id))
    return false;
  try {
    let result: any;
    if (bookmark) {
      result = await BookmarkAPI.delLessonBookmark(lesson_id);
    } else {
      result = await BookmarkAPI.putLessonBookmark(lesson_id);
    }
    return result.data.data;
  } catch (e) {
    alert("요청을 처리하는 데 오류가 발생하였습니다.");
    console.log(e, '좋아요 정보를 가져오는 데 오류가 발생했습니다.');
    return false;
  }
}

/**
 * BookmarkButton 프로퍼티 인터페이스
 */
 export interface BookmarkButtonIProps {
  lesson_id: number
}

/**
 * 북마크 버튼 컴포넌트입니다. 서버와의 비동기 통신으로 강의에 대한 북마크 여부 및 북마크 상태를 업데이트 합니다.
 * 
 * @returns 리액트 앨리먼트
 * @author joohongpark
 */
export default function BookmarkButton({lesson_id}: BookmarkButtonIProps) {
  const [bookmark, setBookmark] = useState<boolean>(false);

  useEffect(() => {
    getBookmark(lesson_id).then(result => setBookmark(result));
  }, [lesson_id]);

  return (
    <IconButton color="inherit" 
      onClick={
        () => ToggleBookmark(lesson_id, bookmark).then(
          (result) => {
            if (result) {
              setBookmark(!bookmark);
            }
          }
        )
      }>
      {bookmark ? <Bookmark /> : <BookmarkBorder />}
    </IconButton>
  );
}