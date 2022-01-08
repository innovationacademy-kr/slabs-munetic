import styled from 'styled-components';
import { categoryData } from '../../dummy/categoryData';
import palette from '../../style/palette';
import Button from '../common/Button';

const CategoryPageContainer = styled.div`
  margin: 30px;
  height: 70%;
  background-color: ${palette.grayBlue};
  border-radius: 5px;
  .categoryTitle {
    margin: 15px 0px 10px 0px;
    color: ${palette.green};
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

const StyledButton = styled(Button)`
  width: 28%;
  border-radius: 7px;
  background-color: ${palette.green};
  margin: 5px 5px;
  padding: 0;
  .buttonText {
    width: 100%;
    margin: 0;
    font-size: 15px;
    color: ${palette.darkBlue};
  }
`;

export default function CategoryContainer() {
  return (
    <CategoryPageContainer>
      <div className="categoryWrapper">
        <div className="categoryTitle">카테고리별 검색</div>
        {categoryData && (
          <div className="categoryIconWrapper">
            {categoryData.map((category, i) => (
              <StyledButton to={`/lesson/classes?category=${category}`} key={i}>
                {category}
              </StyledButton>
            ))}
          </div>
        )}
      </div>
    </CategoryPageContainer>
  );
}
