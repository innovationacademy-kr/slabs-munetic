import { Sequelize } from 'sequelize';
import { Admin } from './admin.model';
import { Category } from './category.model';
import { Lesson } from './lesson.model';
import { User } from './user.model';
import { development } from '../config/config';
// const { development } = require('../config/config');

const { host, port, database, username, password } = development;

export const sequelize = new Sequelize(database!, username!, password, {
  host,
  port,
  dialect: 'mariadb',
  dialectOptions: {
    charset: 'utf8mb4',
  },
  timezone: '+09:00',
  define: {
    timestamps: true,
    deletedAt: true,
    paranoid: true,
  },
});

let CategoryInstance: typeof Category;
let UserInstance: typeof User;
let LessonInstance: typeof Lesson;
let AdminInstance: typeof Admin;

sequelize
  .authenticate()
  .then(() => console.log('db connected🚀'))
  .catch(err => {
    console.log(host);
    console.log('db connection failed🙀', err);
  });

export function Models() {
  CategoryInstance = Category.initModel(sequelize);
  UserInstance = User.initModel(sequelize);
  LessonInstance = Lesson.initModel(sequelize);
  AdminInstance = Admin.initModel(sequelize);

  Category.hasMany(Lesson, {
    foreignKey: {
      name: 'category_id',
      allowNull: false,
    },
  });
  Lesson.belongsTo(Category);
  User.hasMany(Lesson, {
    foreignKey: {
      name: 'tutor_id',
      allowNull: false,
    },
  });
  Lesson.belongsTo(User);
  return sequelize;
}

/**
 * MariaDB 테이블 연결
 */

Models()
  .sync({ force: false })
  .then(() => {
    console.log('👍 Modeling Successed');
  })
  .catch(err => console.log(err, '🙀 Modeling Failed'));

const DatabaseInit = () => {};

export {
  CategoryInstance,
  UserInstance,
  LessonInstance,
  AdminInstance,
  DatabaseInit,
};
