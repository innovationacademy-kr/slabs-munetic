import { Op } from 'sequelize';
import * as Status from 'http-status';
import ErrorResponse from '../modules/errorResponse';
import { Lesson } from '../models/lesson';
import * as CategoryService from './category.service';
import * as UserService from './user.service';
import { Category } from '../models/category';
import { User } from '../models/user';


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

export const searchLessonsByTitle = async (category: string, title: string) => {
    
    let category_id = (await CategoryService.findCategoryIdByName(category)).id;    
    const condition = (category_id === 0) ? 
        {title: {[Op.substring]: title}} : 
        {[Op.and]: [{category_id},{title: {[Op.substring]: title}}]}

    const data = await Lesson.findAll({
        where: condition,
        include: [
            {
                model: Category,
                attributes: [
                    'id', 'name'
                ]
            },
            {
                model: User,
                attributes: [
                    'id', 'nickname', 'name', 'name_public', 'image_url'
                ]
            },
        ]
    })
    return data;
};

export const searchLessonsByTutor = async (category: string, tutor_name: string) => {

    let category_id = (await CategoryService.findCategoryIdByName(category)).id;
    let result = (await UserService.findTutorIdByName(tutor_name)).id;
    const condition = (category_id === 0) ? 
        {tutor_id: result} : 
        {[Op.and]: [{category_id},{tutor_id: result}]}

    const data = await Lesson.findAll({
        where: condition,
        include: [
            {
                model: Category,
                attributes: [
                    'id', 'name'
                ]
            },
            {
                model: User,
                attributes: [
                    'id', 'nickname', 'name', 'name_public', 'image_url'
                ]
            },
        ]
    })
    return data;
}
