import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { classData } from '../../dummy/classData';

const ClassListContainer = styled.div`
  margin: 30px;
`;

const ClassItemContainer = styled(Link)`
  background-color: #457b9d;
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
    color: #f1faee;
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

export default function ClassList() {
  const [getparams, setParams] = useSearchParams();
  const categoryParam = getparams.get('category');
  return (
    <ClassListContainer>
      {classData &&
        (categoryParam === '전체'
          ? classData.map(lesson => (
              <ClassItem lesson={lesson} key={lesson.id} />
            ))
          : classData.map(lesson => {
              if (lesson.category === categoryParam) {
                return <ClassItem lesson={lesson} key={lesson.id} />;
              }
            }))}
    </ClassListContainer>
  );
}
