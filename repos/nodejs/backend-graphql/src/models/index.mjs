import sequelize from "sequelize";
import initEntity from "./entity.mjs";
const { DataTypes } = sequelize;

const globalId = {
    type: DataTypes.VIRTUAL,
    get: function() {
        return Buffer.from(`${this.constructor.name}:${this.get("_id")}`).toString("base64");
    },
};

const initModels = (db) => ({
    Entity: initEntity(db, globalId),
});

export default initModels;
