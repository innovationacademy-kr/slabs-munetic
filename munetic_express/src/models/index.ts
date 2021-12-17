import { Sequelize } from 'sequelize';
import { config } from '../config/config';
import { Category } from './category';
import { Lesson } from './lesson';
import { User } from './user';

const { db } = config.development;

const { host, port, database, username, password } = db as {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
};

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

  Category.hasMany(Lesson);
  Lesson.belongsTo(Category, {
    foreignKey: {
      name: 'category_name',
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
