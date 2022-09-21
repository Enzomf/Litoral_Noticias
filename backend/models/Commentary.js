const sequelize = require("../db/conn");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Notice = require("./Notice");

const Commentary = sequelize.define(
  "commentaries",
  {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    writter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

Commentary.belongsTo(Notice);
Notice.hasMany(Commentary);

Commentary.belongsTo(User);
User.hasMany(Commentary);

module.exports = Commentary;
