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
  birth: Date;
  email: string | null;
  phone_number: string | null;
  phone_public: boolean | null;
  image_url: string | null;
  introduction: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
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
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
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
  public birth!: Date;
  public email!: string | null;
  public phone_number!: string | null;
  public phone_public!: boolean | null;
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
          get() {
            return undefined; // 비밀번호는 db 조회 후 데이터 리턴시에 제외되도록 함
          },
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
          type: DataTypes.DATEONLY,
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
