const User = require("./User");
const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Notice = sequelize.define(
  "notices",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

User.hasMany(Notice)
Notice.belongsTo(User)


module.exports = Notice
