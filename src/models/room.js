const connection = require("../configs/db");

module.exports = {
  getData: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM room_chat", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getRoom: id => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT room_chat.id, (SELECT users.name FROM room_chat JOIN users on users.id=room_chat.id_user1) as user1, (SELECT users.name FROM room_chat JOIN users on users.id=room_chat.id_user2) as user2 FROM room_chat WHERE room_chat.id=?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  insertData: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO room_chat SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  deleteData: id => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM room_chat WHERE id= ?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
