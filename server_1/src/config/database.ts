import { Sequelize } from "sequelize";

export default (db: string, host: string, username: string, password: string): Sequelize => {
  return new Sequelize({
    database: db,
    host: host,
    username: username,
    password: password,
    dialect: "mysql",
    logging: false
  });
}