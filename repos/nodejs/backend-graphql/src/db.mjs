import initModels from "./models/index.mjs";
import { sqliteConnection } from "@agql.js/db";

const getBackendGraphqlDb = () => {
    const db = sqliteConnection(process.env.SCHEMA_CONFIG_DB_PATH || "./backend-graphql.sqlite3");
    const models = initModels(db);
    db.sync();
    return { db, models };
};
export default getBackendGraphqlDb;
