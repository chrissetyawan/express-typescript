import { Sequelize, Model, DataTypes } from "sequelize";
import config from '../config';
export default class Jobs extends Model {
  public id!: number;
  public queue!: number;
  public payload!: string;
  public attemps!: number;
  public availableAt!: Date;
  public readonly createdAt!: Date;
}

Jobs.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    queue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    payload: {
      type: DataTypes.STRING,
      allowNull: false
    },
    availableAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },
    attemps: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    contactDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
  },
  {
    tableName: "jobs",
    sequelize: config.db
  }
)