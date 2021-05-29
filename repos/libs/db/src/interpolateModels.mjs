const defineEntityContract = (db, { name, fields }) =>
    db.define(
        name,
        Object.fromEntries(
            fields.map((field, fi) => [
                field.name,
                {
                    type: field.type.db,
                    ...((field.params || {}).db || {}),
                },
            ])
        )
    );

const linkEntityContract = ({ name, links }, models) =>
    (links || []).map((link, li) => {
        const linkOptions = {};
        if (link.alias) {
            linkOptions.as = link.alias;
        }
        if (link.foreignKey) {
            linkOptions.foreignKey = link.foreignKey;
        }
        return models[name][link.type](models[link.with], linkOptions);
    });

const modelBuilder = (entity) => ({
    define: (db) => defineEntityContract(db, entity),
    link: (models) => linkEntityContract(entity, models),
});

const interpolateModels = (db, description) => {
    const models = {};

    const modelBuilders = description.map((entity, ei) => modelBuilder(entity));

    modelBuilders.map(({ define }, i) => {
        const model = define(db);
        models[model.name] = model;
    });

    modelBuilders.map(({ link }, i) => link(models));

    return models;
};

export default interpolateModels;
