const authVerify = (req, res, next) =>{


    if(!req.session.userid){

        res.redirect("/auth/login")
    }

    next()

}

module.exports = authVerify