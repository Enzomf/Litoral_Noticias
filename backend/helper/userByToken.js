const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function getUserByToken(req, res, id) {
  let token = req.headers.authorization;
  token = token.split(" ")[1];

  try {
    const { userId } = jwt.decode(token);

    if (id) return userId;

    const user = await User.findOne({ where: { id: userId }, raw: true });

    if (!user) {
       res.status(404).json({ message: "usuário não encontrado" });
       return false
    }

    return user;
  } catch (error) {
    res
      .status(400)
      .json({ message: "Ocorreu algum erro, tente novamente mais tarde" });
  }
}

module.exports = getUserByToken;
