import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class Notification extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public sender!: number;
  public target!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export interface ContactInterface {
  name: string, 
  email: string,
  phone:string,
  sender: number,
  target: number,
}

export interface ContactsInterface extends Array<ContactInterface>{}

Notification.init(
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
    },
    phone: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "notifications",
    sequelize: database, // this bit is important
  }
);

Notification
  .sync()
  .catch(err => console.log("Error while creating contact table : " + err));