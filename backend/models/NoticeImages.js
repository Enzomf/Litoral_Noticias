const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Notice =  require("./Notice")


const NoticeImages = sequelize.define("notice_images", {
    image_name:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

NoticeImages.belongsTo(Notice)
Notice.hasMany(NoticeImages)


module.exports = NoticeImages


