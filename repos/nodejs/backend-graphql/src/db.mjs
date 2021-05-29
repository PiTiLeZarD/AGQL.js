import { dbConnection, interpolateModels, backendModelDescription } from "@agql.js/db";

const getBackendGraphqlDb = () => {
    const db = dbConnection({
        dialect: "sqlite",
        storage: process.env.SCHEMA_CONFIG_DB_PATH || "./backend-graphql.sqlite3",
    });

    const models = interpolateModels(db, backendModelDescription);
    db.sync();

    return { db, models };
};

export default getBackendGraphqlDb;
