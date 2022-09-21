const { Sequelize } = require("sequelize");

const conn = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: process.env.DB_HOST, dialect: process.env.DB_DIALECT }
);

try {
  conn.authenticate();
  console.log("App cenectado ao banco");
} catch (error) {
  console.log(error);
}

module.exports = conn;
