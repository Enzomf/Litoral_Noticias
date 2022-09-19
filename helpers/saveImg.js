const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "public/profileImages",
  filename: function (req, file, cb) {
    const filename =
      Date.now() +
      String(Math.floor(Math.random() * 100) + path.extname(file.originalname));
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });


