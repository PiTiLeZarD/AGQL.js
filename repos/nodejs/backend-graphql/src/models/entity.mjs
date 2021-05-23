import sequelize from "sequelize";
import { globalIdField } from "@agql.js/db";
const { DataTypes } = sequelize;

const entity = (db) =>
    db.define("Entity", {
        ...globalIdField(),
        name: {
            type: DataTypes.STRING,
        },
    });

export default entity;
