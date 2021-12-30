import { Sequelize } from 'sequelize';
import { Admin } from './admin';
import { Category } from './category';
import { Lesson } from './lesson';
import { User } from './user';

const { development } = require('../config/config');
const { host, port, database, username, password } = development;
export const sequelize = new Sequelize(database!, username!, password, {
  host,
  port,
  dialect: 'mariadb',
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true,
    typeCast: true,
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

  Category.hasMany(Lesson);
  Lesson.belongsTo(Category, {
    foreignKey: {
      name: 'category_id',
      allowNull: false,
    },
  });
  User.hasMany(Lesson);
  Lesson.belongsTo(User, {
    foreignKey: {
      name: 'tutor_id',
      allowNull: false,
    },
  });
  return sequelize;
}

export { CategoryInstance, UserInstance, LessonInstance, AdminInstance };
