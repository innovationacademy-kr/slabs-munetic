import { useState, useContext, useEffect } from 'react';
import * as ProfileAPI from '../lib/api/profile';
import { Account } from '../types/enums';
import Contexts from '../context/Contexts';
import styled from 'styled-components';
import Button from './common/Button';
import VideoEmbed from './media/VideoEmbed';
import ViewTutorsProfile, {
  ViewTutorsProfileDataIProps,
} from './profile/ViewTutorsProfile';
import * as LikeAPI from '../lib/api/like';
import * as CommentAPI from '../lib/api/comment';
import { ICommentPerTutorTable } from '../types/commentData';
import { ILikesPerTutorTable } from '../types/lessonLikeData';

const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  border-radius: 40px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ButtonWrapper = styled.div`
  width: 40%;
  height: 40%;
`;

export default function Home() {
  const [userType, setUserType] = useState<Account>(Account.Student);
  const { state } = useContext(Contexts);
  const [manyCommentsTutors, setManyCommentsTutors] =
    useState<ReadonlyArray<ViewTutorsProfileDataIProps>>();
  const [manyLikesTutors, setManyLikesTutors] =
    useState<ReadonlyArray<ViewTutorsProfileDataIProps>>();

  useEffect(() => {
    const getAccountInfo = async () => {
      try {
        const userProfile = await ProfileAPI.getMyProfile();
        setUserType(userProfile.data.data.type);
      } catch (error) {
        console.log(error);
      }
    };
    if (state.loggedin) getAccountInfo();
  }, [state.loggedin]);

  useEffect(() => {
    async function init() {
      try {
        const commentsResult = await CommentAPI.getStarTutors();
        const likesResult = await LikeAPI.getStarTutors();
        const comments = commentsResult.data.data.map(
          (o: ICommentPerTutorTable): ViewTutorsProfileDataIProps => ({
            tutor_id: o.tutor_id,
            num: o.comment_count,
          }),
        );
        const likes = likesResult.data.data.map(
          (o: ILikesPerTutorTable): ViewTutorsProfileDataIProps => ({
            tutor_id: o.tutor_id,
            num: o.like_count,
          }),
        );
        setManyCommentsTutors(comments);
        setManyLikesTutors(likes);
      } catch (e) {
        console.log(e);
      }
    }
    init();
  }, []);
  return (
    <Container>
      <ButtonsWrapper>
        <ButtonWrapper>
          <Button to="/lesson/category">레슨 찾기</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          {userType !== Account.Student ? (
            <Button to="/lesson/manage">레슨 등록</Button>
          ) : (
            <Button to="/auth/register?tutor=tutor">
              레슨 등록
              <br />
              (선생님 계정 필요)
            </Button>
          )}
        </ButtonWrapper>
      </ButtonsWrapper>
      {manyLikesTutors && (
        <ViewTutorsProfile label="좋아요 많은 강사" row={manyLikesTutors} />
      )}
      {manyCommentsTutors && (
        <ViewTutorsProfile label="댓글 많은 강사" row={manyCommentsTutors} />
      )}
      <VideoEmbed title="베스트 연주 영상" id="ldxVFDvWCgg" />
    </Container>
  );
}
