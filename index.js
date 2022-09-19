require("dotenv").config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const exbhs = require("express-handlebars");
const session = require("express-session");
const conn = require("./db/conn");
const flash = require("express-flash");

const app = express();

// Models
const User = require("./models/User");
const Notice = require("./models/Notice");
const Comment = require("./models/Comment");
const CommentResponse = require("./models/CommentResponse");

const NoticesRoute = require("./routes/NoticeRoutes");
const AuthRoute = require("./routes/AuthRoutes");

// Session
app.use(flash())

app.use(
  session({
    name: "session",
    resave: true,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
  })
);

app.use((req, resp, next) => {
  console.log(req.session.userid);
  if (req.session.userid) {
    resp.locals.session = req.session;
  }

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exbhs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Routes
app.use("/notices", NoticesRoute);
app.use("/auth", AuthRoute);

conn
  .sync()
  .then(
    app.listen(PORT, () => {
      `App running on port ${PORT}`;
    })
  )
  .catch((error) => console.log(error));
