import sequelize from "sequelize";
const { DataTypes } = sequelize;

const AgqlDataTypes = {
    globalId: {
        db: DataTypes.VIRTUAL,
        gql: "ID!",
    },
    String: {
        db: DataTypes.STRING,
        gql: "String",
    },
    Integer: {
        db: DataTypes.INTEGER,
        gql: "Int",
    },
};

export default AgqlDataTypes;
