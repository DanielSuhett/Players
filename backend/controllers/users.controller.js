const mongoose = require("../db/mongodb");
const PlayerModel = require("../db/models/player");
var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  const { username, games, password, passwordConfirm } = req.body;

  return PlayerModel.findOne({ username: username }).then(haveusername => {
    if (password && passwordConfirm) {
      if (password != passwordConfirm) {
        res.status(401).send({
          message: "Senhas Incompatíveis"
        });
      } else {
        const player = new PlayerModel();

        player.username = username;
        player.salt = bcrypt.genSaltSync(10);
        player.password = bcrypt.hashSync(password, player.salt);
        player.games = games;
        player.create_at = new Date();

        player.save().then(
          res.status(201).send({
            created: true,
            data: {
              user_created: player
            }
          })
        );
      }
    } else {
      res.status(401).send({
        message: "Confirme sua senha!"
      });
    }
  });
};

exports.listAll = (req, res) => {
  PlayerModel.find((err, players) => {
    if (err) {
      console.log(`Error: ` + err);
    } else {
      if (players.length === 0) {
        res.status(404).send("Not found players");
      } else {
        res.status(200).send(players);
      }
    }
  });
};

exports.listGamePlayers = (req, res) => {
  PlayerModel.find(
    {
      games: req.params.games
    },
    (err, players) => {
      if (err) res.status(500).send(err);
      else {
        if (!players || !players.length)
          res.status(404).send("Not found person on this game");
        else res.status(200).send(players);
      }
    }
  );
};

exports.findPerson = (req, res) => {
  PlayerModel.findOne(
    { _id: new mongoose.mongo.ObjectId(req.params.id) },
    (err, player) => {
      if (err) res.status(500).send(err);
      else {
        if (err || !player) res.status(404).send("Not found person");
        else res.status(200).send(player);
      }
    }
  );
};

exports.deletePerson = (req, res) => {
  PlayerModel.findOneAndDelete(
    {
      _id: new mongoose.mongo.ObjectID(req.params.id)
    },
    (err, player) => {
      if (err) res.status(500).send(err);
      else {
        if (player)
          res.status(200).send({
            deleted: true,
            data: player,
            deleted_at: new Date()
          });
        else res.status(404).send("Not found person");
      }
    }
  );
};

exports.deleteGame = (req, res) => {
  PlayerModel.findOneAndUpdate(
    {
      _id: new mongoose.mongo.ObjectID(req.params.id)
    },
    { $pull: { games: req.params.game } },
    (err, game) => {
      if (err) res.status(500).send(err);
      else {
        if (!game) res.status(404).send("Not found person");
        else
          res.status(200).send({
            deleted: true,
            deleted_at: new Date()
          });
      }
    }
  );
};

exports.editPerson = (req, res) => {
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
