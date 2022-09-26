const User = require("../models/User");
const User_role = require("../models/User_role");
const bcrypt = require("bcryptjs");

async function setAdmin() {

    let password = process.env.ADMIN_PASSWORD
    password = bcrypt.hashSync(password,10)


  const user = await User.create({
    name: "admin",
    password: password,
    email: process.env.ADMIN_EMAIL
  });

  await User_role.create({userId:user.id, roleId: process.env.ROLE_ADMIN})
}

// setAdmin()

module.exports = setAdmin
