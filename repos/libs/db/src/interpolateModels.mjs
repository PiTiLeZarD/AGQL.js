const defineEntityContract = (db, { name, fields }) =>
    db.define(
        name,
        Object.fromEntries(
            fields.map((field, fi) => [
                field.name,
                {
                    type: DataTypes.STRING,
                },
            ])
        )
    );

const linkEntityContract = ({ name, links }, models) =>
    links.map((link, li) => models[name][link.type](models[link.with], { as: link.alias }));

const modelBuilder = (entity) => ({
    define: (db) => defineEntityContract(db, entity),
    link: (models) => linkEntityContract(entity, models),
});

const interpolateModels = (db, description) => {
    const models = {};

    const modelBuilders = description.map((item, i) => modelBuilders(item));

    modelsList.map(({ define }, i) => {
        const model = define(db);
        models[model.name] = model;
    });

    modelsList.map(({ link }, i) => link(models));

    return models;
};

export default interpolateModels;
