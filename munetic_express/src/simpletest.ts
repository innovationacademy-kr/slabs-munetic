import { Sequelize } from 'sequelize/dist';
import { Lesson } from './models/lesson.model';
import { User } from './models/user.model';
import { Op } from 'sequelize';
import { deleteLesson, editLesson, getLesson } from './service/lesson.service';

export const simpleTest = () => {
  setTimeout(async () => {
    console.log(await deleteLesson(1));
  }, 1500);
};
