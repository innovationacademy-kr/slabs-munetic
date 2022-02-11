import { useEffect, useState } from 'react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import * as LikeAPI from '../../lib/api/like';

/**
 * 서버와의 비동기 통신으로 좋아요 상태를 가져오는 함수입니다.
 * 
 * @param lesson_id number 강의 ID
 * @returns boolean 좋아요/싫어요
 * @author joohongpark
 */
async function getLessonLike(lesson_id: number): Promise<boolean> {
  if (Number.isNaN(lesson_id))
    return false;
  try {
    const res = await LikeAPI.getLessonLike(lesson_id);
    return res.data.data;
  } catch (e) {
    console.log(e, '좋아요 정보를 가져오는 데 오류가 발생했습니다.');
    return false;
  }
}

/**
 * 서버와의 비동기 통신으로 좋아요 상태를 반영하는 함수입니다.
 * 
 * @param lesson_id number 강의 ID
 * @param liked boolean 좋아요/싫어요
 * @returns boolean 반영 여부
 * @author joohongpark
 */
async function ToggleLessonLike(lesson_id: number, liked: boolean): Promise<boolean> {
  if (Number.isNaN(lesson_id))
    return false;
  try {
    let result: any;
    if (liked) {
      result = await LikeAPI.delLessonLike(lesson_id);
    } else {
      result = await LikeAPI.putLessonLike(lesson_id);
    }
    return result.data.data;
  } catch (e) {
    console.log(e, '좋아요 정보를 가져오는 데 오류가 발생했습니다.');
    return false;
  }
}

/**
 * 좋아요 버튼 컴포넌트입니다. 서버와의 비동기 통신으로 강의에 대한 좋아요 여부 및 좋아요 상태를 업데이트 합니다.
 * 
 * @param props.lesson_id 강의 ID
 * @returns 리액트 앨리먼트
 * @author joohongpark
 */
export default function LikeButton({lesson_id} : {lesson_id: number}) {
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    getLessonLike(lesson_id).then(result => setLike(result));
  }, [lesson_id]);

  return (
    <IconButton
      color="inherit"
      onClick={
        () => ToggleLessonLike(lesson_id, like).then(
          (result) => {
            if (result) {
              setLike(!like);
            }
          }
        )
      }>
      {like ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
}