const mongoose = require("../config/db");
const PlayerModel = require("../models/player");
const userModel = require("../models/user");

exports.editUser = (req, res) => {
  PlayerModel.findOneAndUpdate(
    { _id: new mongoose.mongo.ObjectID(req.params.id) },
    { $set: req.body, update_at: new Date() },
    (err, player) => {
      if (err) res.status(404).send(err);
      else {
        if (!player) res.status(404).send("Not found person");
        else
          res.status(200).send({
            update: true
          });
      }
    }
  );
};
