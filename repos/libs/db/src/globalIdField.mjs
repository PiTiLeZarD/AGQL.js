import sequelize from "sequelize";
const { DataTypes } = sequelize;

const toGlobalId = (typeName, id) => Buffer.from(`${typeName}:${id}`).toString("base64");
const fromGlobalId = (globalId) =>
    (([typeName, id]) => [typeName, parseInt(id)])(Buffer.from(globalId, "base64").toString("ascii").split(":"));

export { toGlobalId, fromGlobalId };

const globalIdField = () => ({
    _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id: {
        type: DataTypes.VIRTUAL,
        get: function () {
            return toGlobalId(this.constructor.name, this.get("_id"));
        },
    },
});

export default globalIdField;
