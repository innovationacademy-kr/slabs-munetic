import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../style/palette';
import * as LessonAPI from '../../lib/api/lesson';
import * as CommentAPI from '../../lib/api/comment';
import { ILessonData } from '../../types/lessonData';
import { CommentDataType } from '../../types/commentData';
import { Gender } from '../../types/enums';
import Comment from '../comment/Comment';
import CommentTop from '../comment/CommentTop';
import CommentWrite from '../comment/CommentWrite';
import LikeButton from '../like/LikeButton';
import BookmarkButton from '../bookmark/BookmarkButton';
import SnsButtons from '../ui/SnsButtons';
import * as ProfileAPI from '../../lib/api/profile';
import { ITutorProfileData } from '../../types/tutorInfoData';
import VideoEmbed from '../media/VideoEmbed';

const ClassContainer = styled.div`
  margin: 10px;
  background-color: ${palette.green};
`;

const ClassProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${palette.darkBlue};
  .imgAndNickname {
    margin: 20px;
    display: flex;
    flex-direction: column;
  }
  .profileImg {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }
  .nickname {
    margin-top: 10px;
    text-align: center;
    font-size: large;
    font-weight: bold;
  }
  .update {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 15px;
  }
  .sns {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
  }
  .snsTop {
    color: ${palette.red};
    text-align: right;
  }
`;

const Divider = styled.div`
  padding: 15px 20px;
  font-size: 17px;
  font-weight: bold;
  color: ${palette.darkBlue};
  border-bottom: 1px solid ${palette.darkBlue};
  .phoneNumber {
    font-weight: normal;
    color: ${palette.grayBlue};
  }
`;

const PhoneNumber = styled.div`
  font-weight: normal;
  color: ${palette.grayBlue};
`;

const BasicInfo = styled.div`
  .basicInfo {
    margin: 10px 15px 0px 5px;
  }
  .basicInfoDetail {
    display: flex;
    margin: 5px 0;
    font-size: 16px;
  }
  .basicInfoDetailTitle {
    flex: 1;
  }
  .basicInfoDetailValue {
    font-weight: normal;
    flex: 1.5;
    color: ${palette.grayBlue};
  }
`;

const Content = styled.div`
  .contentBox {
    margin: 10px 0;
    padding: 25px 15px;
    border-radius: 5px;
    background-color: white;
  }
  .contentText {
    font-weight: normal;
    font-size: 16px;
  }
`;

/**
 * ???????????? ???????????? ?????? ????????? ?????????????????? ?????? ??? ?????? ????????? ???????????? ???????????????.
 * ?????? ??? ?????? ????????? ????????? ?????? ??????????????? ????????? any ????????? ????????? ????????????.
 *
 * @param ReadonlyArray<any>
 * @returns ReadonlyArray<CommentDataType>
 * @author joohongpark
 */
function convertComment(
  arr: ReadonlyArray<any>,
): ReadonlyArray<CommentDataType> {
  // FIXME: ????????? ???????????? ??????????????? ID??? double quote ??????????????? ???????????? ???.
  const login_id: string | undefined = localStorage
    .getItem('user')
    ?.replace(/["]+/g, '');
  return arr.map((comment: any) => ({
    commentListId: comment.id,
    user_id: comment.user_id,
    nickname: comment.User.nickname,
    text: comment.content,
    date:
      comment.updatedAt !== comment.createdAt
        ? comment.updatedAt
        : comment.createdAt,
    stars: comment.stars,
    accessible: comment.User.login_id === login_id,
    modified: comment.updatedAt !== comment.createdAt,
  }));
}

// TODO: ????????? ???????????? ??????????????? joohongpark
interface InfosType {
  ??????: string;
  '??????/??????': string;
  ??????: number;
  '????????? ??????': string;
  '?????? ??????': number;
}

interface RenderInfoProps {
  infos: InfosType;
}

const RenderInfo = ({ infos }: RenderInfoProps) => {
  const infoArray = [];
  for (const [key, value] of Object.entries(infos)) {
    infoArray.push({ title: key, answer: value });
  }
  return (
    <div className="basicInfo">
      {infos &&
        infoArray.map(info => (
          <div className="basicInfoDetail" key={info.title}>
            <span className="basicInfoDetailTitle">??? {info.title}</span>
            <span className="basicInfoDetailValue">{info.answer}</span>
          </div>
        ))}
    </div>
  );
};

export default function LessonInfo() {
  const classId = useParams().id;
  const [comments, setComments] = useState<ReadonlyArray<CommentDataType>>([]);
  const [classInfo, setClassInfo] = useState<ILessonData>();
  const [tutorData, setTutorData] = useState<ITutorProfileData>();

  const getComment = async () => {
    try {
      const lesson_id: number = Number(classId);
      const res = await CommentAPI.getCommentByLesson(lesson_id);
      const comments_arr = convertComment(res.data.data);
      setComments(comments_arr);
    } catch (e) {
      console.log(e, 'id??? ????????? ???????????? ???????????????.');
    }
  };

  const getBasicInfo = (data: ILessonData): InfosType => ({
    ??????: data.User.birth as unknown as string,
    '??????/??????': data.location || '',
    ??????: data.price || 0,
    '????????? ??????': data.User.gender as unknown as string,
    '?????? ??????': data.minute_per_lesson || 0,
  });

  const sortByStar = () => {
    const new_comments = [...comments].sort(
      (a: CommentDataType, b: CommentDataType) => b.stars - a.stars,
    );
    setComments(new_comments);
  };

  const decSortByStar = () => {
    const new_comments = [...comments].sort(
      (a: CommentDataType, b: CommentDataType) => a.stars - b.stars,
    );
    setComments(new_comments);
  };

  const sortByTime = () => {
    const new_comments = [...comments].sort(
      (a: CommentDataType, b: CommentDataType) =>
        a.commentListId - b.commentListId,
    );
    setComments(new_comments);
  };

  const addComment = async (stars: number | null, comment: string) => {
    if (!comment) {
      alert('?????? ????????? ???????????????');
      return;
    }
    const star: number = stars === null ? 1 : stars;
    try {
      await CommentAPI.addComment(Number(classId), comment, star);
      getComment();
    } catch (e) {
      alert('?????? ????????? ?????????????????????.');
      console.log(e, '?????? ????????? ?????????????????????.');
    }
  };

  const modComment = async (
    commentId: number,
    stars: number,
    comment: string,
  ) => {
    if (!comment) {
      alert('?????? ????????? ???????????????');
      return;
    }
    try {
      await CommentAPI.modComment(commentId, comment, stars);
      getComment();
    } catch (e) {
      alert('?????? ????????? ?????????????????????.');
      console.log(e, '?????? ????????? ?????????????????????.');
    }
  };

  const delComment = async (commentId: number) => {
    try {
      await CommentAPI.delComment(commentId);
      getComment();
    } catch (e) {
      alert('?????? ????????? ?????????????????????.');
      console.log(e, '?????? ????????? ?????????????????????.');
    }
  };

  const updateOrder = async () => {
    try {
      await LessonAPI.updateLessonOrder(parseInt(classId as string));
    } catch (e) {
      alert('?????? 1????????? ????????? ???????????????.');
      console.log(e, '??? ?????????????????? ?????????????????????.');
    }
  };

  useEffect(() => {
    async function getLessonById(id: string) {
      try {
        const res = await LessonAPI.getLesson(Number(id));
        setClassInfo(res.data.data);
      } catch (e) {
        console.log(e, 'id??? ????????? ???????????? ???????????????.');
      }
    }
    if (classId) {
      getLessonById(classId);
      getComment();
    }
  }, [classId]);

  useEffect(() => {
    async function getTutorProfile() {
      try {
        if (classInfo?.tutor_id) {
          const tutorProfile = await ProfileAPI.getTutorProfileById(
            classInfo?.tutor_id,
          );
          setTutorData({
            ...tutorProfile.data.data,
            career: tutorProfile.data.data.career
              ? JSON.parse(tutorProfile.data.data.career)
              : [],
          });
        }
      } catch (e) {
        console.log(e, '?????? ???????????? ???????????? ???????????????.');
      }
    }
    getTutorProfile();
  }, [classInfo]);
  return (
    <ClassContainer>
      <ClassProfileWrapper>
        <div className="imgAndNickname">
          <Link to={`/profile/tutor/${classInfo?.tutor_id}`}>
            <img
              className="profileImg"
              src={classInfo?.User.image_url}
              alt=""
            />
            <div className="nickname">{classInfo?.User.name}</div>
          </Link>
        </div>
        <div className="update">
          <div>
            <button onClick={updateOrder}>??? ?????? ?????????</button>
          </div>
        </div>
        <div className="sns">
          <div className="snsTop">
            <LikeButton lesson_id={Number(classId)} />
            <BookmarkButton lesson_id={Number(classId)} />
          </div>
          <div className="snsBottom">
            <SnsButtons
              instagramId={tutorData?.instagram}
              youtubeChannel={tutorData?.youtube}
              soundcloudId={tutorData?.soundcloud}
            />
          </div>
        </div>
      </ClassProfileWrapper>
      <Divider>
        <PhoneNumber>
          ????????? :{' '}
          <span className="phoneNumber">{classInfo?.User.phone_number}</span>
        </PhoneNumber>
      </Divider>
      <Divider>
        <BasicInfo>
          ?????? ?????? ??????
          {classInfo && <RenderInfo infos={getBasicInfo(classInfo)} />}
        </BasicInfo>
      </Divider>
      <Divider>
        {/* TODO: ????????? ?????? ????????? ??? ??? ???????????? ????????? */}
        ?????? ??????
        <br />
        <div>?????? : {tutorData?.spec || '??????'}</div>
        <div>?????? : {tutorData?.career?.join(', ') || '??????'}</div>
      </Divider>
      {classInfo?.youtube && (
        <Divider>
          <VideoEmbed title="?????? ?????????" id={classInfo?.youtube || ''} />
        </Divider>
      )}
      <Divider>
        <Content>
          ??????
          <div className="contentBox">
            <div className="contentText">{classInfo?.content}</div>
          </div>
        </Content>
      </Divider>
      <CommentTop
        commentCount={comments.length}
        refrash={getComment}
        sortByTime={sortByTime}
        incSortByStar={sortByStar}
        decSortByStar={decSortByStar}
      />
      <Comment comments_arr={comments} edit={modComment} del={delComment} />
      <CommentWrite initStars={5} initComment={''} submit={addComment} />
      <Divider />
    </ClassContainer>
  );
}
