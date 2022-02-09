import { Category } from '../models/category';

export const createUser = async (category: Category) => {
  const data = await category.save();
  const dataJSON = data.toJSON() as any;
  return dataJSON;
};

export const findAllCategory = async () => {
  const categories = await Category.findAll();
  if (categories === null) return '카테고리가 없습니다.';
  return categories;
};

export const findCategoryIdByName = async (category_name: string) => {
  const data = await Category.findOne({
      where: {
          name: category_name
      },
      attributes: ['id']
  })
  if (data === null) return {id: 0};
  return data;
};