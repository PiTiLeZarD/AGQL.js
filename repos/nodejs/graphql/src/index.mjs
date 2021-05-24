import { graphqlHTTP } from "express-graphql";
import expressPlayground from "graphql-playground-middleware-express";
import { schema, rootValue } from "@agql.js/schema";

const bootstrap = (app) => {
    if (app.debug) {
        app.use("/graphql/playground", expressPlayground.default({ endpoint: "/graphql" }));
    }

    app.use(
        "/graphql",
        graphqlHTTP({
            schema,
            rootValue,
            graphiql: false,
        })
    );
};

export default bootstrap;
