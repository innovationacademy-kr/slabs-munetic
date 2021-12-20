import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { categoryData } from '../../dummy/categoryData';

const CategoryPageContainer = styled.div`
  margin: 30px;
  height: 70%;
  background-color: #457b9d;
  border-radius: 5px;
  .categoryTitle {
    margin: 15px 0px 10px 0px;
    color: #f1faee;
    font-size: 20px;
    font-weight: bold;
  }
  .categoryWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .categoryIconWrapper {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 35px;
  }
`;

const CategoryButton = styled.button`
  //Button 이랑 margin, border-radius, width, color, font-size 만 다름
  width: 28%;
  border: 0;
  border-radius: 7px;
  background-color: #f1faee;
  margin: 5px 5px;
  padding: 0;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  ::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  .categoryText {
    width: 100%;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #1d3557;
    font-size: 15px;
    font-weight: bold;
  }
`;

interface IProps {
  name: string;
}

const CategoryItem = ({ name }: IProps) => {
  return (
    <CategoryButton>
      <Link to={`/lesson/classes?category=${name}`}>
        <span className="categoryText">{name}</span>
      </Link>
    </CategoryButton>
  );
};

export default function CategoryContainer() {
  return (
    <CategoryPageContainer>
      <div className="categoryWrapper">
        <div className="categoryTitle">카테고리별 검색</div>
        {categoryData && (
          <div className="categoryIconWrapper">
            {categoryData.map((category, i) => (
              <CategoryItem name={category} key={i} />
            ))}
          </div>
        )}
      </div>
    </CategoryPageContainer>
  );
}
