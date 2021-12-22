import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

export enum Account {
  student = 'STUDENT',
  tutor = 'TUTOR',
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}

export interface userAttributes {
  id: number;
  type: Account;
  login_id?: string;
  login_password?: string;
  nickname?: string;
  name?: string;
  name_public?: boolean;
  gender?: Gender;
  age?: number;
  email?: string;
  phone_number?: string;
  phone_public?: boolean;
  image_url?: string;
  introduction?: string;
}

export type userCreationAttributes = Optional<
  userAttributes,
  | 'login_id'
  | 'login_password'
  | 'nickname'
  | 'name'
  | 'gender'
  | 'age'
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
  public type!: Account;
  public login_id?: string;
  public login_password?: string;
  public nickname?: string;
  public name?: string;
  public name_public?: boolean;
  public gender?: Gender;
  public age?: number;
  public email?: string;
  public phone_number?: string;
  public phone_public?: boolean;
  public image_url?: string;
  public introduction?: string;

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
        gender: {
          allowNull: true,
          type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
        },
        age: {
          allowNull: true,
          type: DataTypes.INTEGER,
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
