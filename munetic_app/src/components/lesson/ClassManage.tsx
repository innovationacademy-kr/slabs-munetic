import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { classData } from '../../dummy/classData';
import palette from '../../style/palette';
import Button from '../common/Button';
import ClassList, { ClassItem } from './ClassList';

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
  padding: 30px 30px;
  font-weight: bold;
  font-size: 17px;
  color: ${palette.darkBlue};
  .classList {
    margin-top: 20px;
  }
`;

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
              <ClassItem lesson={lesson} mode="manage" key={lesson.id} />
            ))}
        </div>
      </ClassListWrapper>
      <ClassList />
    </ClassManageContainer>
  );
}
