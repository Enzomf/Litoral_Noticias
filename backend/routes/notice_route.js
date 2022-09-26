const route = require("express").Router();
const auth_verify = require("../middleware/auth_verify");
const role_verify = require("../middleware/role_verify");
const NoticeController = require("../controllers/notice_controller");
const upload = require("../middleware/image_upload")

route.post(
  "/add",
  auth_verify,
  role_verify([process.env.ROLE_WRITTER]), upload.single("image"), 
  NoticeController.add_notice
);

route.get("/:noticeId", NoticeController.getNotice)
route.get("/image/:imageName", NoticeController.sendImage)

module.exports = route;
