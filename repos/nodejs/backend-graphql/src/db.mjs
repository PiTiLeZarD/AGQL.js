import { sqliteConnection, backendModel } from "@agql.js/db";

const getBackendGraphqlDb = () => {
    const db = sqliteConnection(process.env.SCHEMA_CONFIG_DB_PATH || "./backend-graphql.sqlite3");
    const models = backendModel(db);
    db.sync();
    return { db, models };
};
export default getBackendGraphqlDb;
