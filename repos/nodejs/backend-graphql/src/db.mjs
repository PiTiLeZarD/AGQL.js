import sequelize from "sequelize";
import initModels from "./models/index.mjs";
const { Sequelize } = sequelize;

const config = { dialect: "sqlite", storage: "/db/backend-graphql.sqlite3" };
const db = new Sequelize(config);

export const models = initModels(db);

db.sync();

export default db;
