const User = require("../models/User");
const bcrypt = require("bcryptjs");
const User_role = require("../models/User_role");

const generateToken = require("../helper/generateToken");

class AuthController {
  async register(req, res) {
    const { name, email, password, confirmatePassword } = req.body;

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    if (!confirmatePassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" });
      return;
    }

    if (password != confirmatePassword) {
      res.status(422).json({ message: "As senhas não batem!" });
      return;
    }

    const emailExists = await User.findOne({
      where: { email: email },
      attributes: { exclude: "password" },
    });

    if (emailExists) {
      res.status(422).json({ message: "E-mail já cadastrado!" });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const user = await User.create(userData);
      const role = await User_role.create({
        userId: user.id,
        roleId: process.env.ROLE_READER,
      });

      const token = generateToken(res, user.dataValues.id , role.roleId);

      res
        .status(200)
        .json({ message: "usuário criado com sucesso!", token: token });
      return;
    } catch (error) {
      res.status(400).json({ erro: error });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "E-mail é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "Senha é obrigatória!" });
      return;
    }

    const checkUser = await User.findOne({
      where: { email: email },
      include: [User_role],
    });

    if (!checkUser) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    if (!bcrypt.compareSync(password, checkUser.password)) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }


    const token = generateToken(res, checkUser.id, checkUser.user_role.roleId)

    res.json({ message: "Usuário autenticado!", token: token});
  }
}

module.exports = new AuthController();
