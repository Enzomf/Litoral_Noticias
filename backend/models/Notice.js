const sequelize = require("../db/conn");
const { DataTypes } = require("sequelize");
const User = require("./User");

const Notice = sequelize.define(
  "notices",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category:{
      type:DataTypes.STRING,
      allowNull:false
    },
    destaque:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    }
  },
  { timestamps: true }
);

Notice.belongsTo(User);
User.hasMany(Notice);

module.exports = Notice;
