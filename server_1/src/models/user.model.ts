import { Model, DataTypes } from "sequelize";
import Role from "./role.model";
import Team from "./team.model";
import config from "../config";
import Offer from "./offers.model";
export default class User extends Model {
  public id!: number;
  public roleId!: number;
  public teamId!: number;
  public username!: string;
  public fullname!: string;
  public role: Role | undefined;
  public team: Team | undefined;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Role,
        key: 'id'
      }
    },
    teamId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Team,
        key: 'id',
      }
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
    username: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING(225),
      allowNull: false
    }
  },
  {
    tableName: "users",
    sequelize: config.db,
  }
);

User.belongsTo(Team, {
  foreignKey: 'teamId',
  targetKey: 'id',
  as: 'team',
  onDelete: 'CASCADE'
});

User.hasMany(Offer, {
  foreignKey: 'userId',
  sourceKey: 'id',
  as: 'offer'
});