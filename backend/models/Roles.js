const sequelize = require("../db/conn");
const { DataTypes } = require("sequelize");
const User = require("./User");

const Role = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {timestamps:false});

module.exports = Role;
