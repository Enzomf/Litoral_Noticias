const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.originalUrl.includes("user")) {
      cb(null, "upload/profileImages");
      return;
    }
    if (req.originalUrl.includes("notice")) {
      cb(null, "upload/noticeImages");
      return;
    }
  },
  filename: function (req, file, cb) {
    let fileExtention = file.originalname.split(".")[1];
    const fileName =
      Date.now() + Math.floor(Math.random() * 100) + fileExtention;

    cb(null, fileName);
  },
});

const upload = multer({storage});

module.exports = upload


