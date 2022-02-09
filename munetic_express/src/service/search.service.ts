import { Op } from 'sequelize';
import * as Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import { Lesson } from '../models/lesson';
import * as CategoryService from './category.service';
import * as UserService from './user.service';


export const searchLessonsAll = async () => {
    const data = await Lesson.findAll()
    return data;
}

export const searchLessonsByCategory = async (category_name: string) => {
    let result = await CategoryService.findCategoryIdByName(category_name);
    const data = await Lesson.findAll({
        where: {
            category_id: result.id,
        },
    })
    return data;
};

export const searchLessonsByTitle = async (title_name: string) => {
    const data = await Lesson.findAll({
        where: {
            title: {
                [Op.substring]: title_name,
            }
        },
    })
    return data;
};

export const searchLessonsByTutor = async (tutor_name: string) => {
    let result = await UserService.findTutorIdByName(tutor_name);
    const data = await Lesson.findAll({
        where: {
            tutor_id: result.id,
        },
    })
    return data;
}
