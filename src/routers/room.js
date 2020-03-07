const express = require("express");
const multer = require("multer");
const Router = express.Router();
const roomController = require("../controllers/room");

Router.get("/", roomController.getData);
Router.post("/", roomController.insertData);
Router.delete("/", roomController.deleteData);

module.exports = Router;
