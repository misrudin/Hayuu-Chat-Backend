const roomModel = require("../models/room");
const helpers = require("../helpers/helpers");

module.exports = {
  getData: (req, res) => {
    const id = req.query.id;
    if (id) {
      roomModel
        .getRoom(id)
        .then(result => {
          helpers.response(res, result, 200);
        })
        .catch(err => {
          helpers.response(res, {}, 201, err);
          console.log(err);
        });
    } else {
      roomModel
        .getData()
        .then(result => {
          helpers.response(res, result, 200);
        })
        .catch(err => {
          helpers.response(res, {}, 201, err);
          console.log(err);
        });
    }
  },
  insertData: (req, res) => {
    const { id_user1, id_user2 } = req.body;
    const data = {
      id_user1,
      id_user2
    };
    roomModel
      .insertData(data)
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
  },
  deleteData: (req, res) => {
    const id = req.query.id;
    roomModel
      .deleteData(id)
      .then(result => {
        const response = {
          id
        };
        helpers.response(res, response, 200);
      })
      .catch(err => {
        helpers.response(res, {}, 201, err);
        console.log(err);
      });
  }
};
