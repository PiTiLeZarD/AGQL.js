import AgqlDataTypes from "./AgqlDataTypes.mjs";

const toGlobalId = (typeName, id) => Buffer.from(`${typeName}:${id}`).toString("base64");
const fromGlobalId = (globalId) =>
    (([typeName, id]) => [typeName, parseInt(id)])(Buffer.from(globalId, "base64").toString("ascii").split(":"));

export { toGlobalId, fromGlobalId };

const globalIdField = () => [
    {
        name: "_id",
        type: AgqlDataTypes.Integer,
        params: {
            db: {
                primaryKey: true,
                autoIncrement: true,
            },
            gql: {
                hide: true,
            },
        },
    },
    {
        name: "id",
        type: AgqlDataTypes.globalId,
        params: {
            db: {
                get: function () {
                    return toGlobalId(this.constructor.name, this.get("_id"));
                },
                set: function (value) {
                    if (!value) {
                        return;
                    }
                    const { typeName, id } = fromGlobalId(value);
                    if (typeName != this.constructor.name) {
                        throw new Error(`Invalid ID provided (value: ${value} typeName: ${typeName} id: ${id})`);
                    }
                    this.setDataValue("_id", id);
                },
            },
        },
    },
];

export default globalIdField;
