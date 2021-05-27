import globalIdField from "../globalIdField.mjs";

import sequelize from "sequelize";
const { DataTypes } = sequelize;

const model = {
    define: (db) =>
        db.define("Entity", {
            ...globalIdField(),
            name: {
                type: DataTypes.STRING,
            },
        }),
    link: (models) => models.Entity.hasMany(models.Field, { as: "fields", foreignKey: "entity_id" }),
};

export default model;
