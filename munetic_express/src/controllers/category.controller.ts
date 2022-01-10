import { RequestHandler } from 'express';
import * as Status from 'http-status';
import { ResJSON } from '../modules/types';
import * as CategoryService from '../service/category.service';

export const getAllCategory: RequestHandler = async (req, res, next) => {
  try {
    let result: ResJSON;
    const categories = await CategoryService.findAllCategory();
    result = new ResJSON(
      '모든 카테고리를 불러오는데 성공하였습니다.',
      categories,
    );
    res.status(Status.OK).json(result);
  } catch (err) {
    next(err);
  }
};
