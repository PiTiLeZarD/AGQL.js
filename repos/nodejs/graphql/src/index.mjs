import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import expressPlayground from "graphql-playground-middleware-express";

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const rootValue = {
    hello: () => "world !",
};

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
