import { Sequelize } from 'sequelize';
import { Category } from './category';
import { Lesson } from './lesson';
import { Bookmark } from './bookmark';
import { Comment } from './comment';
import { User } from './user';
import { LessonLike } from './lessonLike';
import { TutorInfo } from './tutorInfo';
import { Etc } from './etc';

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

sequelize
  .authenticate()
  .then(() => console.log('db connected🚀'))
  .catch(err => {
    console.log(host);
    console.log('db connection failed🙀', err);
  });

export function Models() {
  Category.initModel(sequelize);
  User.initModel(sequelize);
  Lesson.initModel(sequelize);
  Bookmark.initModel(sequelize);
  Comment.initModel(sequelize);
  LessonLike.initModel(sequelize);
  TutorInfo.initModel(sequelize);
  Etc.initModel(sequelize);

  Category.hasMany(Lesson, {
    foreignKey: {
      name: 'category_id',
      allowNull: false,
    },
  });
  Lesson.belongsTo(Category, {
    foreignKey: {
      name: 'category_id',
      allowNull: false,
    },
  });
  User.hasMany(Lesson, {
    foreignKey: {
      name: 'tutor_id',
      allowNull: false,
    },
  });
  Lesson.belongsTo(User, {
    foreignKey: {
      name: 'tutor_id',
      allowNull: false,
    },
  });
  User.hasMany(Bookmark, {
    foreignKey: 'user_id',
  });
  Bookmark.belongsTo(User, {
    foreignKey: 'user_id',
  });
  Lesson.hasOne(Bookmark, {
    foreignKey: 'lesson_id',
  });
  Bookmark.belongsTo(Lesson, {
    foreignKey: 'lesson_id',
  });
  User.hasMany(LessonLike, {
    foreignKey: 'user_id',
  });
  LessonLike.belongsTo(User, {
    foreignKey: 'user_id',
  });
  Lesson.hasMany(LessonLike, {
    foreignKey: 'lesson_id',
  });
  LessonLike.belongsTo(Lesson, {
    foreignKey: 'lesson_id',
  });
  User.hasMany(Comment, {
    foreignKey: 'user_id',
  });
  Comment.belongsTo(User, {
    foreignKey: 'user_id',
  });
  Lesson.hasMany(Comment, {
    foreignKey: 'lesson_id',
  });
  Comment.belongsTo(Lesson, {
    foreignKey: 'lesson_id',
  });
  User.hasOne(TutorInfo, {
    foreignKey: 'user_id',
  });
  TutorInfo.belongsTo(User, {
    foreignKey: 'user_id',
  });
  return sequelize;
}