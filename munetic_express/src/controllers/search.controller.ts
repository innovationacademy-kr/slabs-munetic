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
 * 악기 이름을 통해 Lesson 데이터를 가져옵니다.
 * @param req 
 * @param res 
 * @param next 
 */

export const getLessonsByInstrument: RequestHandler = async (req, res, next) => {
    try {
        let result: ResJSON;

        const instrument_name = req.query.instrument as string;
        const data = await SearchService.searchLessonsByInstrument(instrument_name);
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
 * 튜터 이름을 통해 Lesson 데이터를 가져옵니다.
 * @param req 
 * @param res 
 * @param next 
 */

export const getLessonsByTutor: RequestHandler = async (req, res, next) => {
    try {
        let result: ResJSON;

        const tutor_name = req.query.tutor as string;
        const data = await SearchService.searchLessonsByTutor(tutor_name);
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
 * 위치를 통해 Lesson 데이터를 가져옵니다.
 * @param req 
 * @param res 
 * @param next 
 */

export const getLessonsByLocation: RequestHandler = async (req, res, next) => {
    try {
        let result: ResJSON;

        const location_name = req.query.location as string;
        const data = await SearchService.searchLessonsByLocation(location_name);
        result = new ResJSON (
            '데이터를 불러오는데 성공하였습니다.',
            data,
        )
        res.status(Status.OK).json(result);
    } catch (err) {
        next(err);
    }
}