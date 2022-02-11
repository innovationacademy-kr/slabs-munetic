import { Sequelize, DataTypes, Model, Optional, HasOneGetAssociationMixin } from 'sequelize';
import { Lesson } from './lesson';

export interface lessonLikeAttributes {
  id: number;
  user_id: number;
  lesson_id: number;
  lesson_like: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

type lessonLikeCreationAttributes = Optional<lessonLikeAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class LessonLike
  extends Model<lessonLikeAttributes, lessonLikeCreationAttributes>
  implements lessonLikeAttributes
{
  public id!: number;
  public user_id!: number;
  public lesson_id!: number;
  public lesson_like!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  declare getLesson: HasOneGetAssociationMixin<Lesson>;

  static initModel(sequelize: Sequelize): typeof LessonLike {
    return LessonLike.init(
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
        lesson_like: {
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
      { tableName: 'LessonLike', sequelize },
    );
  }
}
