const connection = require("../configs/db");
const fs = require("fs");

module.exports = {
  getData: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  register: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO users SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
