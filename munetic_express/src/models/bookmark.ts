import { Sequelize, DataTypes, Model, Optional, HasOneGetAssociationMixin } from 'sequelize';
import { Lesson } from './lesson';

export interface bookmarkAttributes {
  id: number;
  user_id: number;
  lesson_id: number;
  lesson_bookmark: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

type bookmarkCreationAttributes = Optional<bookmarkAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class Bookmark
  extends Model<bookmarkAttributes, bookmarkCreationAttributes>
  implements bookmarkAttributes
{
  public id!: number;
  public user_id!: number;
  public lesson_id!: number;
  public lesson_bookmark!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  declare getLesson: HasOneGetAssociationMixin<Lesson>;

  static initModel(sequelize: Sequelize): typeof Bookmark {
    return Bookmark.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        user_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        lesson_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        lesson_bookmark: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
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
      { tableName: 'Bookmark', sequelize },
    );
  }
}
