import {
  Sequelize,
  DataTypes,
  Model,
  Optional,
  HasOneGetAssociationMixin,
} from 'sequelize';
import { Json } from 'sequelize/types/utils';
import { Lesson } from './lesson';

export interface tutorInfoAttributes {
  id: number;
  user_id: number;
  spec: string;
  career: string;
  youtube: string;
  instagram: string;
  soundcloud: string;
  tutor_introduction: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

type tutorInfoCreationAttributes = Optional<
  tutorInfoAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class TutorInfo
  extends Model<tutorInfoAttributes, tutorInfoCreationAttributes>
  implements tutorInfoAttributes
{
  public id!: number;
  public user_id!: number;
  public spec!: string;
  public career!: string;
  public youtube!: string;
  public instagram!: string;
  public soundcloud!: string;
  public tutor_introduction!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  declare getLesson: HasOneGetAssociationMixin<Lesson>;

  static initModel(sequelize: Sequelize): typeof TutorInfo {
    return TutorInfo.init(
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
        spec: {
          allowNull: true,
          type: DataTypes.STRING(1024),
        },
        career: {
          allowNull: true,
          type: DataTypes.STRING(1024),
        },
        youtube: {
          allowNull: true,
          type: DataTypes.STRING(1024),
        },
        instagram: {
          allowNull: true,
          type: DataTypes.STRING(1024),
        },
        soundcloud: {
          allowNull: true,
          type: DataTypes.STRING(1024),
        },
        tutor_introduction: {
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
      { tableName: 'TutorInfo', sequelize },
    );
  }
}
