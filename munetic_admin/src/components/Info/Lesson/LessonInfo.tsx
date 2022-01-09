import { useLocation } from 'react-router-dom';
import Title from '../Common/Title';
import { useInfo } from '../../../contexts/info';
import { TextFields, TextField, TextField_ } from '../Common/TextFields';

export default function LessonInfo() {
  const info = useInfo() as any;
  const path = useLocation().pathname;

  return (
    <>
      <Title> 레슨 정보 </Title>
      <TextField>
        <p>제목</p>
        <div>{info.title}</div>
      </TextField>
      <TextFields>
        <TextField>
          <p>카테고리</p>
          <div>{info['Category.name']}</div>
        </TextField>
        <TextField_>
          <p>위치</p>
          <div>{info.location}</div>
        </TextField_>
      </TextFields>
      <TextField>
        <p>가격</p>
        <div>{info.price}</div>
      </TextField>
      <TextField>
        <p>시간(분)</p>
        <div>{info.minute_per_lesson}</div>
      </TextField>
      <TextField>
        <p>생성일</p>
        <div>{info.createdAt}</div>
      </TextField>
      <TextField>
        <p>최근 수정일</p>
        <div>{info.updatedAt}</div>
      </TextField>
      <TextField>
        <p>삭제일</p>
        <div>{info.deletedAt || '없음'}</div>
      </TextField>
    </>
  );
}
