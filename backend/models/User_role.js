const sequelize = require("../db/conn");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Role = require("./Roles")


const User_role = sequelize.define("user_roles", {
    
},)

User_role.belongsTo(User)
User.hasOne(User_role)

User_role.belongsTo(Role)

module.exports = User_role