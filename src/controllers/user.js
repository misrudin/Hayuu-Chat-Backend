const userModel = require("../models/user");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  getData: (req, res) => {
    userModel
      .getData()
      .then(result => {
        helpers.response(res, result, 200);
      })
      .catch(err => {
        helpers.response(res, {}, 201, err);
      });
  },

  register: (req, res) => {
    const { name, address, gender, email, password, lat, lng } = req.body;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        const data = {
          name,
          address,
          gender,
          email,
          password: hash,
          lat,
          lng,
          image: process.env.URL_IMG + `uploads/${req.file.filename}`
        };
        userModel
          .register(data)
          .then(result => {
            const response = {
              id: result.insertId,
              ...data
            };
            helpers.response(res, response, 200);
          })
          .catch(err => {
            helpers.response(res, {}, 201, err);
            console.log(err);
          });
      });
    });
  },

  login: (req, res) => {
    const email = req.body.email;
    conn.query("SELECT * FROM users WHERE email = ?", email, (err, result) => {
      if (!err) {
        if (result.length > 0) {
          const passwordInput = req.body.password;
          const passwordHash = result[0].password;
          const id = result[0].id;
          bcrypt.compare(passwordInput, passwordHash, function(err, resPass) {
            if (resPass) {
              const token = jwt.sign({ id }, process.env.PRIVATE_KEY);
              res.json({
                id: result[0].id,
                token: token
              });
            } else {
              res.json({ msg: "Password Wrong!" });
            }
          });
        } else {
          res.json({ msg: "Username not found, please register!" });
        }
      } else {
        console.log(err);
      }
    });
  }
};
