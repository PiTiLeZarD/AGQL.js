import initEntity from "./entity.mjs";

const initModels = (db) => {
    return {
        Entity: initEntity(db),
    };
};

export default initModels;
