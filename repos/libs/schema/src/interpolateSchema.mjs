import { schemaComposer } from "graphql-compose";
import pluralize from "pluralize";

const interpolateSchema = (models, description) => {};

// const interpolateSchema = async (models, backendModels) => {
//     const entities = await backendModels.Entity.findAll({ include: [{ model: backendModels.Field, as: "fields" }] });

//     const types = {};

//     entities.map((entity, i) => {
//         const typeName = `${entity.name}TC`;

//         const fields = ["id: String!"].concat((entity.fields || []).map((field, i) => `${field.name}: String`));

//         types[typeName] = schemaComposer.createObjectTC(`
//             type ${entity.name} {
//                 ${fields.join("\n")}
//             }
//         `);

//         schemaComposer.Query.addFields({
//             [pluralize.plural(entity.name).toLowerCase()]: {
//                 type: [types[typeName]],
//                 resolve: async () => models[entity.name].findAll(),
//             },
//         });
//     });

//     const schema = schemaComposer.buildSchema();

//     return { schema, types };
// };

export default interpolateSchema;
