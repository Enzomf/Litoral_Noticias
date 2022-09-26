const route = require("express").Router();
const verify_role = require("../middleware/role_verify");
const verify_auth = require("../middleware/auth_verify");
const AdminController = require("../controllers/admin_controller");

route.patch(
  "/promove/writter",
  verify_auth,
  verify_role([process.env.ROLE_ADMIN]),
  AdminController.promove_to_writter
);

route.patch(
  "/promove/admin",
  verify_auth,
  verify_role([process.env.ROLE_ADMIN]),
  AdminController.promove_to_admin
);

route.delete(
  "/ban/:id",
  verify_auth,
  verify_role([process.env.ROLE_ADMIN]),
  AdminController.ban_user
);

module.exports = route;
