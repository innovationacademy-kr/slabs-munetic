import { sequelize } from './index';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface adminAttributes {
  id: number;
  login_email: string | null;
  login_password: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

type adminCreationAttributes = Optional<
  adminAttributes,
  | 'id'
  | 'login_email'
  | 'login_password'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>;

export class Admin
  extends Model<adminAttributes, adminCreationAttributes>
  implements adminAttributes
{
  public id!: number;
  public login_email!: string | null;
  public login_password!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Admin {
    return Admin.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        login_email: {
          allowNull: true,
          type: DataTypes.STRING(80),
          unique: true,
        },
        login_password: {
          allowNull: true,
          type: DataTypes.STRING(60),
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
      { tableName: 'Admin', sequelize },
    );
  }
}
