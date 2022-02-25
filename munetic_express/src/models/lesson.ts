import { Sequelize, DataTypes, Model, Optional, HasManyGetAssociationsMixin } from 'sequelize';
import { LessonLike } from './lessonLike';
import { Comment } from './comment';

export interface lessonAttributes {
  id: number;
  tutor_id: number;
  category_id: number;
  title: string | null;
  price: number | null;
  location: string | null;
  minute_per_lesson: number | null;
  content: string | null;
  youtube: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

/**
 * 레슨 테이블에 값을 삽입할 때 (자동 생성되어서) 생략해도 되는 데이터를 명시합니다.
 * 
 * @author Jonghyun Lim
 * @version 1
 */
export type lessonCreationAttributes = Optional<
  lessonAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class Lesson
  extends Model<lessonAttributes, lessonCreationAttributes>
  implements lessonAttributes
{
  public id!: number;
  public tutor_id!: number;
  public category_id!: number;
  public title!: string;
  public price!: number | null;
  public location!: string | null;
  public minute_per_lesson!: number | null;
  public content!: string | null;
  public youtube!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  declare getComments: HasManyGetAssociationsMixin<Comment>;
  declare getLessonLikes: HasManyGetAssociationsMixin<LessonLike>;

  static initModel(sequelize: Sequelize): typeof Lesson {
    return Lesson.init(
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        tutor_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          // references: {
          //   model: 'user',
          //   key: 'id',
          // },
        },
        category_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          // references: {
          //   model: 'category',
          //   key: 'id',
          // },
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
        minute_per_lesson: {
          allowNull: true,
          type: DataTypes.INTEGER,
        },
        content: {
          allowNull: true,
          type: DataTypes.STRING(8192),
        },
        youtube: {
          allowNull: true,
          type: DataTypes.STRING(1024),
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
