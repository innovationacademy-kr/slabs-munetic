import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface lessonAttributes {
  id: number;
  title: string | null;
  price: number | null;
  location: string | null;
  age: number | null;
  minute_per_lesson: number | null;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

type lessonCreationAttributes = Optional<
  lessonAttributes,
  | 'id'
  | 'price'
  | 'location'
  | 'age'
  | 'minute_per_lesson'
  | 'content'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>;

export class Lesson
  extends Model<lessonAttributes, lessonCreationAttributes>
  implements lessonAttributes
{
  public id!: number;
  public title!: string;
  public price!: number | null;
  public location!: string | null;
  public age!: number | null;
  public minute_per_lesson!: number | null;
  public content!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Lesson {
    return Lesson.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        title: {
          allowNull: false,
          type: DataTypes.STRING(128),
        },
        price: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        location: {
          allowNull: true,
          type: DataTypes.STRING(128),
        },
        age: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        minute_per_lesson: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        content: {
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
      { tableName: 'Lesson', sequelize },
    );
  }
}
