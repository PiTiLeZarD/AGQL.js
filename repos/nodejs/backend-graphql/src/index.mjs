import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import expressPlayground from "graphql-playground-middleware-express";

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const rootValue = {
    hello: () => "world!",
};

const bootstrap = (app) => {
    if (app.debug) {
        app.use("/backend/graphql/playground", expressPlayground.default({ endpoint: "/backend/graphql" }));
    }

    app.use(
        "/backend/graphql",
        graphqlHTTP({
            schema,
            rootValue,
            graphiql: false,
        })
    );
};

export default bootstrap;
