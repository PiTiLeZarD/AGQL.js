import { graphqlHTTP } from "express-graphql";
import expressPlayground from "graphql-playground-middleware-express";
import schema from "./schema.mjs";
import rootValue from "./rootValue.mjs";

const bootstrap = (app) => {
    if (app.debug) {
        app.use("/backend/graphql/playground", expressPlayground.default({ endpoint: "/backend/graphql" }));
    }

    app.use(
        "/backend/graphql",
        graphqlHTTP({
            schema: schema(),
            rootValue: rootValue(),
            graphiql: false,
        })
    );
};

export default bootstrap;
