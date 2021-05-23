import { models } from "./db.mjs";

const rootValue = {
    entities: async () => await models.Entity.findAll(),
    createEntity: async ({ input }) => await models.Entity.create({ name: input.name }),
};

export default rootValue;
