const route = require("express").Router();
const verifyRole = require("../helpers/verifyRole");
const authVerify = require("../helpers/authVerify")

const NoticeController = require("../controllers/NoticeController");


route.get("/" , verifyRole(['admin']), NoticeController.loadNotices);

module.exports = route;
