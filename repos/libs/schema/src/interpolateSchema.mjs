import { schemaComposer } from "graphql-compose";

const interpolateSchema = (models, description) => {
    const types = {};

    description.map((entity, ei) => {
        const typeName = `${entity.name}TC`;
        const fields = entity.fields.map((field, fi) => `${field.name}: ${field.type.gql}`);
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
    });

    const schema = schemaComposer.buildSchema();

    return { schema, types };
};

export default interpolateSchema;
