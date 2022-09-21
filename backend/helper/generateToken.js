const jwt = require("jsonwebtoken");

function generateToken(res, id, role) {
  if (!id || !role) {
    return res.status(400).json({ message: "Ocorreu algum erro" });
  }

  try {
    const token = jwt.sign(
      { userId: id, role: role },
      process.env.TOKEN_SECRET,
      { expiresIn: '24h' }
    );
    return token;
  } catch (error) {
    res.status(400).json({ message: "Ocorreu algum erro, tente novamente" });
  }
}

module.exports = generateToken;
