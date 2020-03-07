require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.SERVER_PORT;
const cors = require("cors");
const morgan = require("morgan");

const router = require("./src/routers/index");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads", express.static("./uploads"));

app.use("/api/v1", router);

app.listen(port, () => console.log(`App running Listen port ${port}`));
