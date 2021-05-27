import entity from "./entity.mjs";
import field from "./field.mjs";

const modelsList = [entity, field];

const backendModel = (db) => {
    const models = {};

    modelsList.map(({ define }, i) => {
        const model = define(db);
        models[model.name] = model;
    });

    modelsList.map(({ link }, i) => link(models));

    return models;
};

export default backendModel;
