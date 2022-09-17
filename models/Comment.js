const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");
const Notice = require("./Notice")
const User = require("./User")

const Comment = sequelize.define("comments", {
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
}, {timestamps:true})


Comment.belongsTo(User)
Comment.belongsTo(Notice)
Notice.hasMany(Comment)
User.hasMany(Comment)

module.exports = Comment