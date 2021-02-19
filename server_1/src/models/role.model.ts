import { Model, DataTypes } from "sequelize";
import User from "./user.model";
import config from '../config';

export default class Role extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init(
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
    tableName: "roles",
    sequelize: config.db
  }
)
