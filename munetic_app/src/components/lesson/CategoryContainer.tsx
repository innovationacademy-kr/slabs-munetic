import { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../style/palette';
import { CategoryDataType } from '../../types/categoryData';
import Button from '../common/Button';
import * as CategoryAPI from '../../lib/api/category';

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
  const [categoryData, setCategoryData] = useState<CategoryDataType[]>();

  useEffect(() => {
    async function getCategory() {
      try {
        const res = await CategoryAPI.getMyProfile();
        setCategoryData(res.data.data);
      } catch (e) {
        console.log(e, '카테고리를 불러오지 못했습니다.');
      }
    }
    getCategory();
  }, []);

  return (
    <CategoryPageContainer>
      <div className="categoryWrapper">
        <div className="categoryTitle">카테고리별 검색</div>
        {categoryData && (
          <div className="categoryIconWrapper">
            {categoryData.map((category, i) => (
              <StyledButton
                to={`/lesson/classes?category=${category.name}`}
                key={i}
              >
                {category.name}
              </StyledButton>
            ))}
          </div>
        )}
      </div>
    </CategoryPageContainer>
  );
}
