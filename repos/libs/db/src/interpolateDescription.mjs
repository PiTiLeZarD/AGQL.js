const interpolateDescription = (models) =>
    models.Entity.findAll({ include: [{ model: models.Field, as: "fields" }] }).then((entities) =>
        entities.map((entity, ei) => ({
            name: entity.name,
            fields: (entity.fields || []).map((field, fi) => ({
                name: field.name,
                type: DataTypes.STRING,
            })),
        }))
    );

export default interpolateDescription;
