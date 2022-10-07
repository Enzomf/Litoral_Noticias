require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const conn = require("./db/conn");


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Models
const UserModel = require("./models/User");
const NoticeModel = require("./models/Notice");
const CommentaryModel = require("./models/Commentary");
const Commentary_responseModel = require("./models/Commentary_response");
const User_roles = require("./models/User_role");
const Role = require("./models/Roles");
const NoticeImage = require("./models/NoticeImages");

// Rotas
const AuthRoute = require("./routes/auth_route");
const UserRoute = require("./routes/user_route");
const AdminRoute = require("./routes/admin_routes");
const NoticeRoute = require("./routes/notice_route");

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/admin", AdminRoute);
app.use("/notice", NoticeRoute);



conn
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("app rodando na porta %s", process.env.PORT);
      // require("./helper/setRoles");
      // require("./helper/setAdmin");
    });
  })
  .catch((error) => {
    console.log(error);
  });
