import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

export enum Account {
  Student = 'Student',
  Tutor = 'Tutor',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}

export interface userAttributes {
  id: number;
  type: Account;
  login_id: string | null;
  login_password: string | null;
  nickname: string;
  name: string;
  name_public: boolean;
  birth: Date;
  gender: Gender;
  email: string | null;
  phone_number: string | null;
  phone_public: boolean;
  image_url: string | null;
  introduction: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type userCreationAttributes = Optional<
  userAttributes,
  | 'login_id'
  | 'login_password'
  | 'nickname'
  | 'name'
  | 'name_public'
  | 'birth'
  | 'gender'
  | 'email'
  | 'phone_number'
  | 'phone_public'
  | 'image_url'
  | 'introduction'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>;

export class User
  extends Model<userAttributes, userCreationAttributes>
  implements userAttributes
{
  public id!: number;
  public type!: Account;
  public login_id!: string | null;
  public login_password!: string | null;
  public nickname!: string;
  public name!: string;
  public name_public!: boolean;
  public birth!: Date;
  public gender!: Gender;
  public email!: string | null;
  public phone_number!: string | null;
  public phone_public!: boolean;
  public image_url!: string | null;
  public introduction!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

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
          allowNull: false,
          type: DataTypes.STRING(50),
        },
        name_public: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        birth: {
          allowNull: false,
          type: DataTypes.DATEONLY,
        },
        gender: {
          allowNull: false,
          type: DataTypes.ENUM('Male', 'Female', 'Other'),
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
          allowNull: false,
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        image_url: {
          allowNull: true,
          type: DataTypes.STRING(256),
        },
        introduction: {
          allowNull: true,
          type: DataTypes.STRING(8192),
        },
        createdAt: {
          field: 'createdAt',
          type: DataTypes.DATE,
        },
        updatedAt: {
          field: 'updatedAt',
          type: DataTypes.DATE,
        },
        deletedAt: {
          field: 'deletedAt',
          type: DataTypes.DATE,
        },
      },
      { tableName: 'User', sequelize },
    );
  }
}
