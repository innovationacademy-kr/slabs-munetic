import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
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
  .sns {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
  }
  .snsTop {
    color: ${palette.red};
  }
`;

const ClassPhoneNumber = styled.div`
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

const ClassBasicInfo = styled.div`
  padding: 15px 20px;
  font-size: 17px;
  font-weight: bold;
  color: ${palette.darkBlue};
  border-bottom: 1px solid ${palette.darkBlue};
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

const ClassContent = styled.div`
  padding: 15px 20px;
  font-size: 17px;
  font-weight: bold;
  color: ${palette.darkBlue};
  border-bottom: 1px solid ${palette.darkBlue};
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
 * 서버에서 전달받은 댓글 객체를 클라이언트가 읽을 수 있는 객체로 변환하는 함수입니다.
 * 개발 중 변경 사항이 많을듯 하여 파라미터는 임시로 any 타입의 배열로 받습니다.
 * 
 * @param ReadonlyArray<any> 
 * @returns ReadonlyArray<CommentDataType>
 * @author joohongpark
 */
function convertComment(arr: ReadonlyArray<any>): ReadonlyArray<CommentDataType> {
  // FIXME: 추후에 브라우저 로컬저장소 ID에 double quote 들어가는거 제거해야 함.
  const login_id: string | undefined = localStorage.getItem('user')?.replace(/["]+/g, '');
  return (arr.map((comment: any) => 
    ({
      commentListId: comment.id,
      nickname: comment.User.nickname,
      text: comment.content,
      date: (comment.updatedAt !== comment.createdAt) ? comment.updatedAt : comment.createdAt,
      stars: comment.stars,
      accessible: (comment.User.login_id === login_id),
      modified: (comment.updatedAt !== comment.createdAt),
    })
  ));
};


// TODO: 추후에 컴포넌트 분리해야함 joohongpark
interface InfosType {
  '나이': string;
  '지역/장소': string;
  '가격': number;
  '선생님 성별': string;
  '수업 시간': number;
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
            <span className="basicInfoDetailTitle">• {info.title}</span>
            <span className="basicInfoDetailValue">{info.answer}</span>
          </div>
        ))}
    </div>
  );
};

export default function Class() {
  const classId = useParams().id;
  const [comments, setComments] = useState<ReadonlyArray<CommentDataType>>([]);
  const [classInfo, setClassInfo] = useState<ILessonData>();

  const getComment = async () => {
    try {
      const lesson_id: number = Number(classId);
      const res = await CommentAPI.getCommentByLesson(lesson_id);
      const comments_arr = convertComment(res.data.data);
      setComments(comments_arr);
    } catch (e) {
      console.log(e, 'id로 레슨을 불러오지 못했습니다.');
    }
  }

  const getBasicInfo = (data: ILessonData): InfosType => ({
    '나이': data.User.birth as unknown as string,
    '지역/장소': data.location || "",
    '가격': data.price || 0,
    '선생님 성별': data.User.gender as unknown as string,
    '수업 시간': data.minute_per_lesson || 0,
  });

  const sortByStar = () => {
    const new_comments = [...comments].sort((a: CommentDataType, b: CommentDataType) => (
      b.stars - a.stars
    ));
    setComments(new_comments);
  }

  const decSortByStar = () => {
    const new_comments = [...comments].sort((a: CommentDataType, b: CommentDataType) => (
      a.stars - b.stars
    ));
    setComments(new_comments);
  }

  const sortByTime = () => {
    const new_comments = [...comments].sort((a: CommentDataType, b: CommentDataType) => (
      a.commentListId - b.commentListId
    ));
    setComments(new_comments);
  }

  const addComment = async (stars: number | null, comment: string) => {
    if (!comment) {
      alert('댓글 내용을 입력하세요');
      return ;
    }
    const star: number = (stars === null) ? 1 : stars;
    try {
      await CommentAPI.addComment(Number(classId), comment, star);
      getComment();
    } catch (e) {
      alert('댓글 추가에 실패하였습니다.');
      console.log(e, '댓글 추가에 실패하였습니다.');
    }
  }

  const modComment = async (commentId:number, stars: number, comment: string) => {
    if (!comment) {
      alert('댓글 내용을 입력하세요');
      return ;
    }
    try {
      await CommentAPI.modComment(commentId, comment, stars);
      getComment();
    } catch (e) {
      alert('댓글 수정에 실패하였습니다.');
      console.log(e, '댓글 수정에 실패하였습니다.');
    }
  }

  const delComment = async (commentId:number) => {
    try {
      await CommentAPI.delComment(commentId);
      getComment();
    } catch (e) {
      alert('댓글 삭제에 실패하였습니다.');
      console.log(e, '댓글 삭제에 실패하였습니다.');
    }
  }

  useEffect(() => {
    async function getLessonById(id: string) {
      try {
        const res = await LessonAPI.getLesson(Number(id));
        console.log(res);
        setClassInfo(res.data.data);
      } catch (e) {
        console.log(e, 'id로 레슨을 불러오지 못했습니다.');
      }
    }
    if (classId) {
      getLessonById(classId);
      getComment();
    }
  }, [classId]);

  return (
    <ClassContainer>
      <ClassProfileWrapper>
        <div className="imgAndNickname">
          <img className="profileImg" src={classInfo?.User.image_url} alt="" />
          <div className="nickname">
            <Link to={`/profile/${classInfo?.tutor_id}`}>{classInfo?.User.name}</Link>
          </div>
        </div>
        <div className="sns">
          <div className="snsTop">
            <LikeButton lesson_id={Number(classId)} />
            <BookmarkButton lesson_id={Number(classId)} />
          </div>
          <div className="snsBottom">
            <InstagramIcon />
            <YouTubeIcon />
          </div>
        </div>
      </ClassProfileWrapper>
      <ClassPhoneNumber>
        연락처 : <span className="phoneNumber">{classInfo?.User.phone_number}</span>
      </ClassPhoneNumber>
      <ClassBasicInfo>
        레슨 기본 정보
        {classInfo && <RenderInfo infos={getBasicInfo(classInfo)} />}
      </ClassBasicInfo>
      <ClassContent>
        본문
        <div className="contentBox">
          <div className="contentText">{classInfo?.content}</div>
        </div>
      </ClassContent>
      <CommentTop
        commentCount={comments.length}
        refrash={getComment}
        sortByTime={sortByTime}
        incSortByStar={sortByStar}
        decSortByStar={decSortByStar} />
      <Comment comments_arr={comments} edit={modComment} del={delComment} />
      <CommentWrite initStars={5} initComment={""} submit={addComment} />
      <ClassContent>
      </ClassContent>
    </ClassContainer>
  );
}
