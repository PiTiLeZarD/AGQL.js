import sequelize from "sequelize";
const { Sequelize } = sequelize;

const connect = (path) => new Sequelize({ dialect: "sqlite", storage: path });

export default connect;
