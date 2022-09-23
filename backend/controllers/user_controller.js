const getUserByToken = require("../helper/userByToken");
const Commentary = require("../models/Commentary");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");
const Commentary_response = require("../models/Commentary_response");

class UserController {
  async updateUserData(req, res) {
    const { name } = req.body;

    const profileImage = req.file.filename;

    if (!name && !profileImage) {
      res.status(422).json({
        message: "é necessário mandar algum dados para ser atualizado",
      });
      return;
    }

    const user = await getUserByToken(req, res);

    if (user.name === name) {
      res
        .status(422)
        .json({ message: "Insira um nome diferente para atualiza-lo" });
      return;
    }
    if (profileImage && !user.profileImage.includes("default")) {
      try {
        fs.unlinkSync(path.join("upload", "profileImages", user.profileImage));
      } catch (err) {
        return res.status(400).json({
          message:
            "Erro ao atualizar a imagem de perfil, tente novamente mais tarde",
        });
      }
    }

    const newUserData = {
      name,
      profileImage,
    };

    try {
      await User.update(newUserData, { where: { id: user.id } });
      res.status(200).json({ message: "Dados atualizados com sucesso!" });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ocorreu algum erro, tente novamente" });
    }
  }

  async getUserInfo(req, res) {
    const id = req.params.id;

    let userData = await User.findOne({
      where: { id: id },
      attributes: { exclude: "password, email" },
      include: [Commentary, Commentary_response],
    });

    if (!userData) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    userData.profileImage = `${process.env.BASE_URL}/user/image/${userData.profileImage}`;

    res.status(200).json(userData);
  }

  getProfileImage(req, res) {
    const imageName = req.params.imageName;
    const path = `upload/profileImages/`;

    try {
      res.sendFile(imageName, { root: path }, function (err) {
        if (err) {
          res.status(404).json({ message: "Imagem não encontrada" });
        }
      });
    } catch (error) {
      res.status(404).json({ message: "Imagem não encontrada" });
    }
  }

  async loggedUserInfo(req, res) {
    const userId = await getUserByToken(req, res, true);

    let userData = await User.findOne({
      where: { id: userId },
      attributes: { exclude: "password" },
      include: [Commentary, Commentary_response],
    });

    userData.profileImage = `${process.env.BASE_URL}/user/image/${userData.profileImage}`;

    res.status(200).json({ message: userData });
  }
}

module.exports = new UserController();
