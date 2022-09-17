const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");
const Comment = require("./Comment");
const User = require("./User");
const Notice = require("./Notice");

const CommentResponse = sequelize.define(
  "comment_responses",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true }
);

CommentResponse.belongsTo(Comment);
CommentResponse.belongsTo(User);
CommentResponse.belongsTo(Notice)
Notice.hasMany(CommentResponse);
Comment.hasMany(CommentResponse)
User.hasMany(CommentResponse)

module.exports = CommentResponse
