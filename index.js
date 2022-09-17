require("dotenv").config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const exbhs = require("express-handlebars");
const session = require("express-sessions");
const conn = require("./db/conn");

const app = express();

// Models
const User = require("./models/User");
const Notice = require("./models/Notice");
const Comment = require("./models/Comment");
const CommentResponse = require("./models/CommentResponse");

const NoticesRoute = require("./routes/NoticeRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exbhs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Routes
app.use("/notices", NoticesRoute);

conn
  .sync({ force: true })
  .then(
    app.listen(PORT, () => {
      `App running on port ${PORT}`;
    })
  )
  .catch((error) => console.log(error));
