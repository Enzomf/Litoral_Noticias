const route = require("express").Router();

const NoticeController = require("../controllers/NoticeController");
route.get("/", NoticeController.loadNotices);

module.exports = route;
