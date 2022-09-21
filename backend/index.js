require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const conn = require("./db/conn");

app.use(cors({ origin: `http://localhost:${process.env.PORT}/` }));
app.use(express.urlencoded({extended:true}))
app.use(express.json());

// Models
const UserModel = require("./models/User");
const NoticeModel = require("./models/Notice");
const CommentaryModel = require("./models/Commentary");
const Commentary_responseModel = require("./models/Commentary_response");
const User_roles = require("./models/User_role");
const Role = require("./models/Roles");


// Rotas
const AuthRoute = require("./routes/auth_route")


app.use("/auth", AuthRoute)



conn.sync().then(()=>{
    app.listen(process.env.PORT, () => {
        console.log("app rodando na porta %s", process.env.PORT);
      });
}).catch(error=>{
    console.log(error)
})



