import { Sequelize, Model, DataTypes } from "sequelize";
import config from '../config';
import Contact from "./contact.model";
import User from "./user.model";

export default class Offer extends Model {
  public id!: number;
  public userId!: string;
  public receiveDate!: Date;
  public status!: string;
  public contactId!: number;
  public contactDate!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


Offer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    receiveDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
    },
    status: {
      type: DataTypes.ENUM('Candidate','InProgress', 'Success', 'Reject'),
      defaultValue: 'Candidate'
    },
    contactId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'contacts',
        key: 'id'
      }
    },
    contactDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
  },
  {
    tableName: "offers",
    sequelize: config.db
  }
)

// Offer.belongsTo(User, {
//   foreignKey: 'userId',
//   targetKey: 'id',
//   as: 'user',
//   onDelete: 'CASCADE'
// })

// Offer.belongsTo(Contact, {
//   foreignKey: 'contactId',
//   targetKey: 'id',
//   as: 'contact',
//   onDelete: 'CASCADE'
// })