import sequelize from "sequelize";
const { DataTypes } = sequelize;

const entity = (db) =>
    db.define("Entity", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    });

export default entity;
