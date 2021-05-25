import { graphqlHTTP } from "express-graphql";
import expressPlayground from "graphql-playground-middleware-express";
import { interpolateModels, dbConnection, backendModel } from "@agql.js/db";
import { interpolateSchema } from "@agql.js/schema";
import fs from "fs";

const bootstrap = async (app) => {
    const testDb = dbConnection({
        dialect: "mariadb",
        host: process.env.GRAPHQL_DB_HOST,
        database: process.env.GRAPHQL_DB_DATABASE,
        username: process.env.GRAPHQL_DB_USERNAME,
        password: fs.readFileSync(process.env.GRAPHQL_DB_PASSWORD_FILE, "utf8"),
    });

    const backendModels = backendModel(
        dbConnection({
            dialect: "sqlite",
            storage: process.env.SCHEMA_CONFIG_DB_PATH || "./backend-graphql.sqlite3",
        })
    );
    const models = await interpolateModels(testDb, backendModels);
    const { schema } = await interpolateSchema(models, backendModels);

    testDb.sync({ alter: true });

    if (app.debug) {
        app.use("/graphql/playground", expressPlayground.default({ endpoint: "/graphql" }));
    }

    app.use(
        "/graphql",
        graphqlHTTP({
            schema,
            graphiql: false,
        })
    );
};

export default bootstrap;
