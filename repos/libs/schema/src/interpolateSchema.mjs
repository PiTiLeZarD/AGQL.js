import { schemaComposer } from "graphql-compose";
import pluralize from "pluralize";

const interpolateSchema = async (models, backendModels) => {
    const entities = await backendModels.Entity.findAll();

    const types = {};

    entities.map((entity, i) => {
        const typeName = `${entity.name}TC`;

        const fields = `
            id: String!
            name: String
        `;

        types[typeName] = schemaComposer.createObjectTC(`
            type ${entity.name} {
                ${fields}
            }
        `);

        schemaComposer.Query.addFields({
            [pluralize.plural(entity.name).toLowerCase()]: {
                type: [types[typeName]],
                resolve: async () => models[entity.name].findAll(),
            },
        });
    });

    const schema = schemaComposer.buildSchema();

    return { schema, types };
};

export default interpolateSchema;
