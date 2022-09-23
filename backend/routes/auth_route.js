const route = require("express").Router();
const AuthController = require("../controllers/auth_controller");
const auth_verify = require("../middleware/auth_verify")

route.post("/register", AuthController.register);
route.post("/login", AuthController.login);
route.patch("/change/password",auth_verify, AuthController.changePassword)

module.exports = route;
