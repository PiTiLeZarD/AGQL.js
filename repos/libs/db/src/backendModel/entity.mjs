import globalIdField from "../globalIdField.mjs";

import sequelize from "sequelize";
const { DataTypes } = sequelize;

const entity = (db) =>
    db.define("Entity", {
        ...globalIdField(),
        name: {
            type: DataTypes.STRING,
        },
    });

export default entity;
