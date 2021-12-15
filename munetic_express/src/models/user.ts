import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

enum ACCOUNT {
  student = 'STUDENT',
  tutor = 'TUTOR',
}

interface userAttributes {
  id: number;
  type: ACCOUNT;
  login_id: string | null;
  login_password: string | null;
  nickname: string;
  name: string | null;
  name_public: boolean | null;
  email: string | null;
  phone_number: string | null;
  image_url: string | null;
  introduction: string | null;
}

type userCreationAttributes = Optional<
  userAttributes,
  | 'id'
  | 'login_id'
  | 'login_password'
  | 'name'
  | 'name_public'
  | 'email'
  | 'phone_number'
  | 'image_url'
  | 'introduction'
>;

export class User
  extends Model<userAttributes, userCreationAttributes>
  implements userAttributes
{
  public id!: number;
  public type!: ACCOUNT;
  public login_id!: string | null;
  public login_password!: string | null;
  public nickname!: string;
  public name!: string | null;
  public name_public!: boolean | null;
  public email!: string | null;
  public phone_number!: string | null;
  public image_url!: string | null;
  public introduction!: string | null;

  static initModel(sequelize: Sequelize): typeof User {
    return User.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        type: {
          allowNull: false,
          type: DataTypes.ENUM('STUDENT', 'TUTOR'),
        },
        login_id: {
          allowNull: false,
          type: DataTypes.STRING(30),
          unique: true,
        },
        login_password: {
          allowNull: false,
          type: DataTypes.STRING(60),
        },
        nickname: {
          allowNull: true,
          type: DataTypes.STRING(30),
          unique: true,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING(50),
        },
        name_public: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING(128),
          unique: true,
        },
        phone_number: {
          allowNull: false,
          type: DataTypes.STRING(20),
          unique: true,
        },
        image_url: {
          allowNull: false,
          type: DataTypes.STRING(256),
        },
        introduction: {
          allowNull: false,
          type: DataTypes.STRING(8192),
        },
      },
      { tableName: 'User', sequelize },
    );
  }
}
