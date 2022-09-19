const route = require("express").Router();
const AuthController = require("../controllers/AuthController");

route.get("/login", AuthController.renderLoginPage);
route.get("/register", AuthController.renderRegisterPage);
route.get("/logout", AuthController.logout)

route.post("/register", AuthController.registerUser);
route.post("/login", AuthController.login);

module.exports = route;
