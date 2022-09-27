const jwt = require("jsonwebtoken");


async function auth_verify(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    res
      .status(401)
      .json({ message: "É necessario fazer login para acessar essa rota" });
    return;
  }
 
  try {
    token = token.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalido" });
  }
}

module.exports = auth_verify;
