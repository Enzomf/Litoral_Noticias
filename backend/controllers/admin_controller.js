const User = require("../models/User");
const User_role = require("../models/User_role");
const userByToken = require("../helper/userByToken");
const bcrypt = require("bcryptjs");
const Notice = require("../models/Notice");
const NoticeImages = require("../models/NoticeImages");
const fs = require("fs")
class AdminController {
  async promove_to_writter(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res
        .status(422)
        .json({ message: "Insira o email do usuário a ser promovido!" });

      return;
    }

    if (!password) {
      res
        .status(422)
        .json({ message: "Insira sua senha para confirmar a promoção!" });
      return;
    }

    const actualUser = await userByToken(req, res);

    console.log(actualUser.password);
    if (!bcrypt.compareSync(password, actualUser.password)) {
      res.status(401).json({ message: "Senha inválida!" });
      return;
    }

    const userToPromove = await User.findOne({
      where: { email: email },
      include: [User_role],
    });

    if (userToPromove.user_role.roleId == process.env.ROLE_ADMIN) {
      res.status(500).json({ message: "Não é possivel promover um adm" });
      return;
    }

    if (userToPromove.user_role.roleId == process.env.ROLE_WRITTER) {
      return res.status(500).json({ message: "Usuário já é um escritor" });
    }

    if (!userToPromove) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    try {
      await User_role.update(
        { roleId: process.env.ROLE_WRITTER },
        { where: { userId: userToPromove.id } }
      );

      res.status(200).json({ message: "Usuário promovido com sucesso!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ocorreu algum erro, tente novamente" });
    }
  }

  async promove_to_admin(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res
        .status(422)
        .json({ message: "Insira o email do usuário a ser promovido!" });

      return;
    }

    if (!password) {
      res
        .status(422)
        .json({ message: "Insira sua senha para confirmar a promoção!" });
      return;
    }

    const actualUser = await userByToken(req, res, false);

    if (!bcrypt.compareSync(password, actualUser.password)) {
      res.status(401).json({ message: "Senha inválida!" });
      return;
    }

    const userToPromove = await User.findOne({
      where: { email: email },
      include: [User_role],
    });

    if (!userToPromove) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (userToPromove.user_role.roleId == process.env.ROLE_ADMIN) {
      res.status(500).json({ message: "Não é possivel promover um adm" });
      return;
    }

    if (userToPromove.user_role.roleId == process.env.ROLE_ADMIN) {
      return res.status(500).json({ message: "Usuário já é um adm" });
    }

    if (!userToPromove) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    try {
      await User_role.update(
        { roleId: process.env.ROLE_ADMIN },
        { where: { userId: userToPromove.id } }
      );

      res.status(200).json({ message: "Usuário promovido com sucesso!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ocorreu algum erro, tente novamente" });
    }
  }

  async ban_user(req, res) {
    const id = req.params.id;

    const userToBan = await User.findOne({ where: { id: id } });

    if (!userToBan) {
      res.status(404).json({ message: "Usuário não encontrado!" });
      return;
    }

    try {
      await User.destroy({ where: { id: id } });
      return res.status(200).json({ message: "Usuário banido com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Ocorreu algum erro, tente novamente" });
    }
  }

  async deleteNotice(req, res) {
    const id = req.params.id;
    console.log(id);

    if (!(await Notice.findOne({ where: { id: id } }))) {
      return res.status(404).json({ message: "Noticia não encontrada" });
    }

    let imageNames = await NoticeImages.findOne({ where: { noticeId: id } });
    imageNames = imageNames.dataValues.image_name.split("/")[5];

    console.log(imageNames);


      fs.unlinkSync(`upload/noticeImages/${imageNames}`);
      await NoticeImages.destroy({ where: { noticeId: id } });
  
    try {
      await Notice.destroy({ where: { id: id } });

      res.status(200).json({ message: "Noticia criada com sucesso!" });
    } catch (err) {}
  }
}

module.exports = new AdminController();
