import globalIdField from "./globalIdField.mjs";
import sequelize from "sequelize";
const { DataTypes } = sequelize;

const interpolateModels = async (db, backendModels) => {
    const entities = await backendModels.Entity.findAll();

    const models = {};
    entities.map((entity, i) => {
        models[entity.name] = db.define(entity.name, {
            ...globalIdField(),
            name: {
                type: DataTypes.STRING,
            },
        });
    });

    return models;
};

export default interpolateModels;
