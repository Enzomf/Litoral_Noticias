const User = require("../models/User")

const verifyRole = (roles)=>{

   return(async (req, res, next)=>{


        const userId = req.session.userid

        if(!userId){
            res.redirect("auth/login")
            return
        }
        const {role} = await User.findOne({where:{id:userId },attributes: {exclude:['password', 'email', 'name', 'profileImage']}})

    
        roles.includes(role) ? console.log("sim")  : console.log("não")

        next()
    })

}

module.exports = verifyRole