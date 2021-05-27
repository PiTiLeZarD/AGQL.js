import globalIdField from "../globalIdField.mjs";

import sequelize from "sequelize";
const { DataTypes } = sequelize;

const model = {
    define: (db) =>
        db.define("Field", {
            ...globalIdField(),
            name: {
                type: DataTypes.STRING,
            },
        }),
    link: (models) => models.Field.belongsTo(models.Entity, { as: "entity" }),
};

export default model;
