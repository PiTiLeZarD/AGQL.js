import sequelize from "sequelize";
const { Sequelize } = sequelize;

const dbConnection = ({ database, user, password, ...otherParams }) =>
    new Sequelize(database, user, password, otherParams);

export default dbConnection;
