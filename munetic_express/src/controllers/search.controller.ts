import { RequestHandler } from 'express';
import * as Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import { ResJSON } from '../modules/types';
import * as SearchService from '../service/search.service';

/**
 * 모든 Lesson 데이터를 가져옵니다.
 * @param req 
 * @param res 
 * @param next 
 */

export const getLessonsAll: RequestHandler = async (req, res, next) => {
    try {
        let result: ResJSON;
        const data = await SearchService.searchLessonsAll()
        result = new ResJSON(
            '데이터를 불러오는데 성공하였습니다.',
            data,
        )
        res.status(Status.OK).json(result);
    } catch (err) {
        next(err);
    }
}

/**
 * 카테고리 별로 Lesson 데이터를 가져옵니다.
 * @param req 
 * @param res 
 * @param next
 * @author sungkim 
 */

export const getLessonsByCategory: RequestHandler = async (req, res, next) => {
    try {
        let result: ResJSON;
        const data = await SearchService.searchLessonsByCategory(req.params.category_name);
        result = new ResJSON (
            '데이터를 불러오는데 성공하였습니다.',
            data,
        )
        res.status(Status.OK).json(result);
    } catch (err) {
        next(err);
    }
}

/**
 * 제목을 토대로 Lesson 데이터를 가져옵니다.
 * @param req 
 * @param res 
 * @param next 
 */

export const getLessonsByTitle: RequestHandler = async (req, res, next) => {
    try {
        let result: ResJSON;

        const category_name = req.query.category as string;
        const title_name = req.query.title as string;
        const data = await SearchService.searchLessonsByTitle(category_name, title_name);
        result = new ResJSON (
            '데이터를 불러오는데 성공하였습니다.',
            data
        )
        res.status(Status.OK).json(result);
    } catch (err) {
        next(err);
    }
}

/**
 * 선생님 이름을 통해 Lesson 데이터를 가져옵니다.
 * @param req 
 * @param res 
 * @param next 
 */

export const getLessonsByTutor: RequestHandler = async (req, res, next) => {
    try {
        let result: ResJSON;

        const category_name = req.query.category as string;
        const tutor_name = req.query.tutor as string;
        const data = await SearchService.searchLessonsByTutor(category_name, tutor_name);
        result = new ResJSON (
            '데이터를 불러오는데 성공하였습니다.',
            data,
        )
        res.status(Status.OK).json(result);
    } catch (err) {
        next(err);
    }
}