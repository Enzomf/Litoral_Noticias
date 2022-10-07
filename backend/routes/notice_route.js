const route = require("express").Router();
const auth_verify = require("../middleware/auth_verify");
const role_verify = require("../middleware/role_verify");
const NoticeController = require("../controllers/notice_controller");
const upload = require("../middleware/image_upload");

route.post(
  "/add",
  auth_verify,
  role_verify([process.env.ROLE_WRITTER]),
  upload.single("image"),
  NoticeController.add_notice
);


route.post("/comment/:id", auth_verify, NoticeController.addComment)
route.post("/comment/response/:id", auth_verify, NoticeController.responseComment)

route.patch(
  "/update/:id",
  auth_verify,
  role_verify([process.env.ROLE_WRITTER]),
  NoticeController.updateNotice
);

route.delete("/delete/:id", auth_verify, role_verify([process.env.ROLE_WRITTER]), NoticeController.deleteNotice)
route.get("/mynotices", auth_verify, role_verify([process.env.ROLE_WRITTER]), NoticeController.myNotices)
route.get("/latest", NoticeController.getLatest)
route.get("/", NoticeController.allNotices);
route.get("/:noticeId", NoticeController.getNotice);
route.get("/image/:imageName", NoticeController.sendImage);

module.exports = route;
