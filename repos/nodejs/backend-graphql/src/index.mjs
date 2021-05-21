import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import expressPlayground from "graphql-playground-middleware-express";
import { models } from "./db.mjs";

const schema = buildSchema(`
    type Entity {
        id: Int
        name: String
    }
    type Query {
        entities: [Entity]
    }
`);

const rootValue = {
    entities: () => models.Entity.findAll(),
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
