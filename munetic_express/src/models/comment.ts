import { Sequelize, DataTypes, Model, Optional, HasOneGetAssociationMixin } from 'sequelize';

/**
 * Comment 테이블의 어트리뷰트들을 명시합니다.
 * 
 * @Author joohongpark
 */
export interface commentAttributes {
  id: number;
  user_id: number;
  lesson_id: number;
  content: string;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

/**
 * Comment 테이블에 값을 삽입할 때 (자동 생성되어서) 생략해도 되는 데이터를 명시합니다.
 * 
 * @Author joohongpark
 */
type commentCreationAttributes = Optional<commentAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

/**
 * Comment 데이터 모델(및 테이블)을 정의합니다.
 * 
 * @Author joohongpark
 */
export class Comment
  extends Model<commentAttributes, commentCreationAttributes>
  implements commentAttributes
{
  public id!: number;
  public user_id!: number;
  public lesson_id!: number;
  public content!: string;
  public stars!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Comment {
    return Comment.init(
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
        content: {
          allowNull: false,
          type: DataTypes.STRING(8192),
        },
        stars: {
          allowNull: false,
          type: DataTypes.INTEGER,
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
      { tableName: 'Comment', sequelize },
    );
  }
}
