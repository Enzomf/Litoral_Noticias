const route = require("express").Router();
const UserController = require("../controllers/user_controller");
const auth_verify = require("../middleware/auth_verify");
const upload = require("../middleware/image_upload");


route.get("/profile", auth_verify, UserController.loggedUserInfo)
route.get("/image/:imageName", UserController.getProfileImage)
route.get("/:id", auth_verify, UserController.getUserInfo);
route.patch("/update", auth_verify, upload.single("image"), UserController.updateUserData);



module.exports = route