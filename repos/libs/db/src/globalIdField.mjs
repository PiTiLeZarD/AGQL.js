import sequelize from "sequelize";
const { DataTypes } = sequelize;

const globalIdField = () => ({
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id: {
        type: DataTypes.VIRTUAL,
        get: function () {
            return Buffer.from(`${this.constructor.name}:${this.get("_id")}`).toString("base64");
        },
    },
});

export default globalIdField;
