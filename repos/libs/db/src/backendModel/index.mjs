import initEntity from "./entity.mjs";

const backendModel = (db) => ({
    Entity: initEntity(db),
});

export default backendModel;
