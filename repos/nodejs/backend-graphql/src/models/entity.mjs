import sequelize from "sequelize";
const { DataTypes } = sequelize;

const entity = (db, globalId) =>
    db.define("Entity", {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id: globalId,
        name: {
            type: DataTypes.STRING,
        },
    });

export default entity;
