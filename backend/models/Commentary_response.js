const sequelize = require("../db/conn");
const { DataTypes } = require("sequelize");
const Commentary = require("./Commentary");
const User = require("./User");

const Commentary_response = sequelize.define(
  "commentary_response",
  {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true }
);

Commentary_response.belongsTo(Commentary);
Commentary.hasMany(Commentary_response);

Commentary_response.belongsTo(User);
User.hasMany(Commentary_response);

module.exports = Commentary_response;
