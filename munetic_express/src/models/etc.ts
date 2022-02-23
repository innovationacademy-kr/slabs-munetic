import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export enum Key {
  Terms = 1,
  License = 2,
}

/**
 * Etc (약관, 라이센스 등이 저장되는 테이블) 테이블의 어트리뷰트들을 명시합니다.
 * 
 * @Author joohongpark
 */
export interface etcAttributes {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

/**
 * Etc 테이블에 값을 삽입할 때 (자동 생성되어서) 생략해도 되는 데이터를 명시합니다.
 * 
 * @Author joohongpark
 */
type etcCreationAttributes = Optional<etcAttributes,
  'createdAt' | 'updatedAt' | 'deletedAt'
>;

/**
 * Etc 데이터 모델(및 테이블)을 정의합니다.
 * 
 * @Author joohongpark
 */
export class Etc
  extends Model<etcAttributes, etcCreationAttributes>
  implements etcAttributes
{
  public id!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Etc {
    return Etc.init(
      {
        id: {
          allowNull: false,
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        content: {
          allowNull: true,
          type: DataTypes.TEXT('medium'),
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
      { tableName: 'Etc', sequelize },
    );
  }
}
