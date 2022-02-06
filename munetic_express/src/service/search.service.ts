import { Op } from 'sequelize';
import * as Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import { Lesson } from '../models/lesson';
import { Category } from '../models/category';
import { User } from '../models/user';
import * as CategoryService from './category.service';


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

export const findTutorIdByName = async (tutor_name: string) => {
    const data = await User.findOne({
        where: {
            name: tutor_name
        },
        attributes: ['id']
    })
    if (data === null) return {id: 0};
    return data;
}

export const searchLessonsAll = async () => {
    const data = await Lesson.findAll()
    return data;
}

export const searchLessonsByCategory = async (category_name: string) => {
    let result = await findCategoryIdByName(category_name);
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
    let result = await findTutorIdByName(tutor_name);
    const data = await Lesson.findAll({
        where: {
            tutor_id: result.id,
        },
    })
    return data;
}
