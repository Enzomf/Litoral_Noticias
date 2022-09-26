const Role = require("../models/Roles")


async function setRoles(){
    await Role.create({id: process.env.ROLE_READER,description:"reader"})
    await Role.create({id: process.env.ROLE_WRITTER,description:"writter"})
    await Role.create({id: process.env.ROLE_ADMIN,description:"admin"})
}

// setRoles()

module.exports = setRoles
 



