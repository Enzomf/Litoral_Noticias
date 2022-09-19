const User = require("../models/User");
const bcrypt = require("bcryptjs");
const session = require("express-session");

class AuthController {
  renderLoginPage(req, res) {
    res.render("auth/login");
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      req.flash("message", "E-mail é obrigatório !");
      res.render("auth/login");
      return;
    }

    if (!password) {
      req.flash("message", "Senha é obragatória!");
      res.render("auth/login");
      return;
    }

    const checkUser = await User.findOne({
      where: { email: email },
      attributes: { exclude: password },
    });

    if (!checkUser) {
      req.flash("message", "Usuário ou senha incorretos!");
      res.render("auth/login");
      return;
    }

    console.log(bcrypt.hashSync(password));
    if (!bcrypt.compareSync(password, checkUser.password)) {
      req.flash("message", "Senha inválida");
      res.render("auth/login");
      return;
    }

    req.session.userid = checkUser.id;
    req.session.profileImage = checkUser.profileImage;

    if (checkUser.role == "admin") {
      req.session.adm = checkUser.role;
    }

    req.session.save(() => {
      res.redirect("/notices");
    });
  }

  logout(req, res) {
    req.flash("message", "Logout feito !");
    req.session.destroy();

    res.redirect("/notices");
  }

  renderRegisterPage(req, res) {
    res.render("auth/register");
  }

  async registerUser(req, res) {
    const { email, password, confPassword, name } = req.body;

    if (!name) {
      req.flash("message", "O nome é obrigatório!");
      res.render("auth/register");
      return;
    }

    if (!email) {
      req.flash("message", "O e-mail é obrigatório!");
      res.render("auth/register");
      return;
    }

    if (!password) {
      req.flash("message", "A senha é obrigatória!");
      res.render("auth/register");
      return;
    }

    if (!confPassword) {
      req.flash("message", "A confirmação de senha é obrigatória!");
      res.render("auth/register");
      return;
    }

    if (password != confPassword) {
      req.flash("message", "As senhas não batem!");
      res.render("auth/register");
      return;
    }

    const userExists = await User.findOne({
      where: { email: email },
      attributes: { exclude: password },
    });

    console.log(userExists);

    if (userExists) {
      req.flash("message", "Email já cadastrado!");
      res.render("auth/register");
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const user = await User.create(userData);

      req.session.userid = user.id;

      req.session.save(() => {
        res.redirect("/notices");
      });
    } catch (error) {
      req.flash("message", "Ocorreu algum erro, tente novamente");
      console.log(error);
    }
  }
}

module.exports = new AuthController();
