import { Model, DataTypes } from "sequelize";
import config from '../config';
export default class Team extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface TeamInterface {
  name: string
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: "teams",
    sequelize: config.db
  }
);