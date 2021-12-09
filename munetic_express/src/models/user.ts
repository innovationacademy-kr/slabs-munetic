import { Model, Optional, Sequelize, DataTypes } from "sequelize";

enum ACCOUNT {
  student = "STUDENT",
  tutor = "TUTOR",
}

interface userAttributes {
  id: number;
  type: ACCOUNT;
  login_id: string;
  login_password: string;
  nickname: string;
  name: string;
  name_public: boolean;
  email: string;
  phone_number: string;
  image_url: string;
  introduction: string;
}

type userCreationAttributes = Optional<
  userAttributes,
  | "id"
  | "login_id"
  | "login_password"
  | "name"
  | "name_public"
  | "email"
  | "phone_number"
  | "image_url"
  | "introduction"
>;

export class User
  extends Model<userAttributes, userCreationAttributes>
  implements userAttributes
{
  public id!: number;
  public type!: ACCOUNT;
  public login_id!: string;
  public login_password!: string;
  public nickname!: string;
  public name!: string;
  public name_public!: boolean;
  public email!: string;
  public phone_number!: string;
  public image_url!: string;
  public introduction!: string;

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
          type: DataTypes.ENUM("STUDENT", "TUTOR"),
        },
        login_id: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
        login_password: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        nickname: {
          allowNull: true,
          type: DataTypes.STRING,
          unique: true,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        name_public: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
        phone_number: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
        image_url: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        introduction: {
          allowNull: false,
          type: DataTypes.STRING,
        },
      },
      { tableName: "User", sequelize }
    );
  }
}
