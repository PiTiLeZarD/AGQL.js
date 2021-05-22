import initEntity from "./entity.mjs";

const initModels = (db) => ({
    Entity: initEntity(db),
});

export default initModels;
