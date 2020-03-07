const express = require("express");
const multer = require("multer");
const Router = express.Router();
const UserController = require("../controllers/user");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, next) => {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith("image/");
    if (image) {
      next(null, true);
    } else {
      next({
        message: "Only image Allowed!"
      });
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
}).single("image");

Router.post(
  "/",
  (req, res, next) => {
    upload(req, res, err => {
      if (err) {
        res.send(err);
      } else {
        next();
      }
    });
  },
  UserController.register
);

Router.get("/", UserController.getData);
Router.post("/login", UserController.login);
module.exports = Router;
