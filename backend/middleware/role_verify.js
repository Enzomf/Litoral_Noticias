const jwt = require("jsonwebtoken");
const User = require("../models/User_role");

const role_verify = (roles) =>{

    return((req, res, next)=>{

        
        let token = req.headers.authorization;
        token = token.split(" ")[1];

        const { role } =  jwt.decode(token)
        console.log(role)


        if(roles.includes(role.toString())){
           return next()
        }

         return res.status(403).json({message:"Acesso negado"})

    } )
}
  

module.exports = role_verify
