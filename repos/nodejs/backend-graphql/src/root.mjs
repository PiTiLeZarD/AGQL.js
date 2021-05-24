import getBackendGraphqlDb from "./db.mjs";

const rootValue = () => {
    const { models } = getBackendGraphqlDb();
    return {
        entities: async () => await models.Entity.findAll(),
        createEntity: async ({ input }) => ({ node: await models.Entity.create({ name: input.name }) }),
    };
};

export default rootValue;
