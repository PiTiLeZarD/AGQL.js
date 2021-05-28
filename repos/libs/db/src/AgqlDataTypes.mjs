import globalIdField from "./globalIdField.mjs";
import sequelize from "sequelize";
const { DataTypes } = sequelize;

const AgqlDataTypes = {
    globalId: {
        db: () => globalIdField(),
        gql: "ID!",
    },
    String: {
        db: DataTypes.STRING,
        gql: "String",
    },
};

export default AgqlDataTypes;
