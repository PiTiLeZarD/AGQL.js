import { schemaComposer } from "graphql-compose";
import { fromGlobalId } from "../../db/src/index.mjs";

const interpolateSchema = (models, description) => {
    const types = {};

    description.map((entity, ei) => {
        const typeName = `${entity.name}TC`;
        const fields = entity.fields
            .map((field, fi) => (((field.params || {}).gql || {}).hide ? "" : `${field.name}: ${field.type.gql}`))
            .filter((v) => v);
        const links = (entity.links || []).map((link, i) =>
            link.expose
                ? link.type == "hasMany"
                    ? `${link.alias}: [${link.with}]`
                    : `${link.alias}: ${link.with}`
                : ""
        );

        types[typeName] = schemaComposer.createObjectTC(`
            type ${entity.name} {
                ${fields.join("\n")}
                ${links.join("\n")}
            }
        `);

        if ((entity.params || {}).query) {
            schemaComposer.Query.addFields({
                [entity.params.query]: {
                    type: [types[typeName]],
                    resolve: async () => {
                        const linksConfig =
                            (entity.links || []).length > 0
                                ? {
                                      include: entity.links.map((link, i) => ({
                                          model: models[link.with],
                                          as: link.alias,
                                      })),
                                  }
                                : {};
                        return models[entity.name].findAll(linksConfig);
                    },
                },
            });
        }

        if ((entity.params || {}).crud) {
            const foreignKey = (link) => {
                if (link.foreignKey) {
                    return link.foreignKey;
                }
                const targetLink = (description.filter((e) => e.name == link.with)[0].links || []).filter(
                    (l) => l.with == entity.name
                );
                if (targetLink.length > 0) {
                    if (targetLink[0].foreignKey) {
                        return targetLink[0].foreignKey;
                    }
                }

                return `${link.with}Id`;
            };
            const inputLinks = (entity.links || [])
                .filter(({ type }) => type == "belongsTo")
                .map((link, li) => foreignKey(link));

            types[`${entity.name}InputTC`] = schemaComposer.createInputTC(`
                input ${entity.name}Input {
                    ${fields.slice(1).join("\n")}
                    ${inputLinks.map((l) => `${l}: ID!`).join("\n")}
                }
            `);
            types[`${entity.name}OutputTC`] = schemaComposer.createObjectTC(`
                type ${entity.name}Output {
                    node: ${entity.name}
                }
            `);

            schemaComposer.Mutation.addFields({
                [`create${entity.name}`]: {
                    type: `${entity.name}Output`,
                    args: {
                        input: `${entity.name}Input!`,
                    },
                    resolve: async (_, { input }) => {
                        Object.keys(input).forEach((key) => {
                            if (inputLinks.indexOf(key) >= 0) {
                                input[key] = fromGlobalId(input[key])[1];
                            }
                        });
                        return { node: await models[entity.name].create({ ...input }) };
                    },
                },
            });
        }
    });

    const schema = schemaComposer.buildSchema();

    return { schema, types };
};

export default interpolateSchema;
