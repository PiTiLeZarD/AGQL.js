import { graphqlHTTP } from "express-graphql";
import expressPlayground from "graphql-playground-middleware-express";
import { models } from "./db.mjs";
import schema from "./schema.mjs";

const rootValue = {
    entities: () => models.Entity.findAll(),
    createEntity: async ({ input }) => await models.Entity.create({ name: input.name }),
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
