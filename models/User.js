const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const User = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:"default.jpg"
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "reader",
    },
  },
  { timestamps: true }
);

module.exports = User;
