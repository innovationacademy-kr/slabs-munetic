import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { classData } from '../../dummy/classData';
import palette from '../../style/palette';
import Button from '../common/Button';
import ClassList from './ClassList';

const ClassManageContainer = styled.div``;

const WriteBtnWrapper = styled.div`
  padding: 80px 30px;
  border-bottom: 1px solid ${palette.darkBlue};
`;

const StyledButton = styled(Button)`
  ::before {
    padding-top: 50%;
  }
`;

const ClassListWrapper = styled.div`
  padding: 40px 30px;
`;

const ClassItemContainer = styled(Link)`
  background-color: ${palette.grayBlue};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 5px;
  .classItemDescription {
    flex: 1;
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
  }
  .classItemTitle {
    margin: 0px 0px 5px 0px;
    color: ${palette.ivory};
    font-size: 18px;
    font-weight: bold;
  }
  .classItemCategory {
    font-size: 12px;
    font-weight: normal;
    color: #f1faee96;
  }
  .classItemImg {
    width: 60px;
    height: 60px;
    margin: 5px;
    align-items: right;
    border-radius: 50%;
  }
`;

interface lessonType {
  id: number;
  title: string;
  img: string;
  category: string;
}

interface IProps {
  lesson: lessonType;
}

const ClassItem = ({ lesson }: IProps) => {
  const { id, title, img, category } = lesson;
  return (
    <ClassItemContainer to={`/lesson/class/${id}`}>
      <div className="classItemDescription">
        <span className="classItemTitle">{title}</span>
        <span className="classItemCategory">카테고리 : {category}</span>
      </div>
      <img className="classItemImg" src={img} alt="" />
    </ClassItemContainer>
  );
};

export default function ClassManage() {
  // 나중에는 현재 로그인한 유저 정보 불러와서 매칭되는 레슨 글만 보이도록 해줄 것

  return (
    <ClassManageContainer>
      <WriteBtnWrapper>
        <StyledButton to="/lesson/write">레슨 글 등록하기</StyledButton>
      </WriteBtnWrapper>
      <ClassListWrapper>
        등록된 레슨
        <div className="classList">
          {classData &&
            classData.map(lesson => (
              <ClassItem lesson={lesson} key={lesson.id} />
            ))}
        </div>
      </ClassListWrapper>
      <ClassList />
    </ClassManageContainer>
  );
}
