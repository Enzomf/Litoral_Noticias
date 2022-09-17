const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: "mysql" }
);

try {
  sequelize.authenticate();
  console.log("DB connection successfully");
} catch (error) {
  console.log(error);
}

module.exports = sequelize;
