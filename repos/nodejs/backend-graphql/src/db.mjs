import sequelize from "sequelize";
import initModels from "./models/index.mjs";
const { Sequelize } = sequelize;

const storage = process.env.SCHEMA_CONFIG_DB_PATH || "/db/backend-graphql.sqlite3";
const config = { dialect: "sqlite", storage };
const db = new Sequelize(config);

export const models = initModels(db);

db.sync();

export default db;
