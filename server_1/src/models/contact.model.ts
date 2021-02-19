import { Model, DataTypes } from "sequelize";
import config from '../config';
import User from '../models/user.model';
import Offer from "./offers.model";
export default class Contact extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please use valid email format."
        }
      },
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: User,
        key: 'id'
      }
    },
  },
  {
    tableName: "contacts",
    sequelize: config.db, // this bit is important
  }
);