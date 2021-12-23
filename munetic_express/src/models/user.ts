import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

export enum ACCOUNT {
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
  birth: number;
  email: string | null;
  phone_number: string | null;
  phone_public: boolean | null;
  image_url: string | null;
  introduction: string | null;
}

export type userCreationAttributes = Optional<
  userAttributes,
  | 'id'
  | 'login_id'
  | 'login_password'
  | 'name'
  | 'name_public'
  | 'birth'
  | 'email'
  | 'phone_number'
  | 'phone_public'
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
  public birth!: number;
  public email!: string | null;
  public phone_number!: string | null;
  public phone_public!: boolean | null;
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
          allowNull: true,
          type: DataTypes.STRING(30),
          unique: true,
        },
        login_password: {
          allowNull: true,
          type: DataTypes.STRING(60),
        },
        nickname: {
          allowNull: false,
          type: DataTypes.STRING(30),
          unique: true,
        },
        name: {
          allowNull: true,
          type: DataTypes.STRING(50),
        },
        name_public: {
          allowNull: true,
          type: DataTypes.BOOLEAN,
        },
        birth: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        email: {
          allowNull: true,
          type: DataTypes.STRING(128),
          unique: true,
        },
        phone_number: {
          allowNull: true,
          type: DataTypes.STRING(20),
          unique: true,
        },
        phone_public: {
          allowNull: true,
          type: DataTypes.BOOLEAN,
        },
        image_url: {
          allowNull: true,
          type: DataTypes.STRING(256),
        },
        introduction: {
          allowNull: true,
          type: DataTypes.STRING(8192),
        },
      },
      { tableName: 'User', sequelize },
    );
  }
}
