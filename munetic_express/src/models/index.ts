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
  Admin.initModel(sequelize);

  Category.hasMany(Lesson, {
    foreignKey: 'category_id',
  });
  Lesson.belongsTo(Category, {
    foreignKey: {
      name: 'category_id',
      allowNull: false,
    },
  });
  User.hasMany(Lesson, {
    foreignKey: 'tutor_id',
  });
  Lesson.belongsTo(User, {
    foreignKey: {
      name: 'tutor_id',
      allowNull: false,
    },
  });
  return sequelize;
}
