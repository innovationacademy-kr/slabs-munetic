import { sequelize } from './index';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface categoryAttributes {
  id: number;
  name: string;
}

type categoryCreationAttributes = Optional<categoryAttributes, 'id'>;

export class Category
  extends Model<categoryAttributes, categoryCreationAttributes>
  implements categoryAttributes
{
  public id!: number;
  public name!: string;

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
      },
      { tableName: 'Category', sequelize },
    );
  }
}
