import { sequelize } from './index';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface categoryAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

type categoryCreationAttributes = Optional<
  categoryAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class Category
  extends Model<categoryAttributes, categoryCreationAttributes>
  implements categoryAttributes
{
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Category {
    return Category.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
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
      { tableName: 'Category', sequelize },
    );
  }
}
