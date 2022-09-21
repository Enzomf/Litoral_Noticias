const route = require("express").Router();
const AuthController = require("../controllers/auth_controller");

route.post("/register", AuthController.register);
route.post("/login", AuthController.login);

module.exports = route;
