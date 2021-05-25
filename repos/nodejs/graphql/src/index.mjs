import { graphqlHTTP } from "express-graphql";
import expressPlayground from "graphql-playground-middleware-express";
import { interpolateModels, sqliteConnection, backendModel } from "@agql.js/db";
import { interpolateSchema } from "@agql.js/schema";

const bootstrap = async (app) => {
    const testDb = sqliteConnection("./test.sqlite3");

    const backendModels = backendModel(
        sqliteConnection(process.env.SCHEMA_CONFIG_DB_PATH || "./backend-graphql.sqlite3")
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
