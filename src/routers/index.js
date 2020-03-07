const express = require("express");

const room = require("./room");
const user = require("./user");

const Router = express.Router();

// Router.use("/room", room);
Router.use("/user", user);

module.exports = Router;
