import getBackendGraphqlDb from "./db.mjs";
import { fromGlobalId } from "@agql.js/db";

const rootValue = () => {
    const { models } = getBackendGraphqlDb();
    return {
        entities: async () => await models.Entity.findAll({ include: [{ model: models.Field, as: "fields" }] }),
        createEntity: async ({ input }) => ({ node: await models.Entity.create({ name: input.name }) }),
        createField: async ({ input }) => ({
            node: await models.Field.create({ name: input.name, entity_id: fromGlobalId(input.EntityId)[1] }),
        }),
    };
};

export default rootValue;
