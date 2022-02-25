import { Category } from '../category';

function createCategories() {
  const categoryLists = [
    { name: '기타' },
    { name: '바이올린' },
    { name: '드럼' },
    { name: '피아노' },
    { name: '하프' },
    { name: '첼로' },
    { name: '하모니카' },
    { name: '베이스' },
    { name: '오카리나' },
    { name: '디제잉' },
    { name: '랩레슨' },
  ];
  categoryLists.forEach(category => {
    Category.create(category as Category)
    .catch(e => console.log(e));
  });
  console.log('🎺 App:DefaultCategoryLists created');
}

export default function initialize() {
  createCategories();
}