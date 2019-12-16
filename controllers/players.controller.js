const mongoose = require("../config/db");
const PlayerModel = require("../models/player");
const userModel = require("../models/user");
const decode = require("jwt-decode");

exports.createPlayer = (req, res) => {
  userModel
    .findOne({
      _id: new mongoose.mongo.ObjectId(
        decodeTokenUserId(req.headers["x-access-token"])
      )
    })
    .then(user => {
      const { username, games } = req.body;
      const player = new PlayerModel();

      player.username = username;
      player.games = games;
      player.userId = decodeTokenUserId(req.headers["x-access-token"]);
      player.create_at = new Date();

      player.save();

      user.data.push(player);

      user.save().then(
        res.status(201).send({
          create_player: true,
          data: {
            create_player: player
          }
        })
      );
    });
};

exports.listPlayers = (req, res) => {
  PlayerModel.find(
    {
      userId: decodeTokenUserId(req.headers["x-access-token"])
    },
    (err, players) => {
      if (err) {
        console.log(`Error: ` + err);
      } else {
        if (players.length === 0) {
          res.status(404).send("Not found players");
        } else {
          res.status(200).send(players);
        }
      }
    }
  );
};

exports.listGamePlayers = (req, res) => {
  PlayerModel.find(
    {
      userId: decodeTokenUserId(req.headers["x-access-token"]),
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

exports.findPlayer = (req, res) => {
  PlayerModel.findOne(
    {
      userId: decodeTokenUserId(req.headers["x-access-token"]),
      _id: new mongoose.mongo.ObjectId(req.params.id)
    },
    (err, player) => {
      if (err) res.status(500).send(err);
      else {
        if (err || !player) res.status(404).send("Not found person");
        else res.status(200).send(player);
      }
    }
  );
};

exports.deleteGame = (req, res) => {
  PlayerModel.findOneAndUpdate(
    {
      userId: decodeTokenUserId(req.headers["x-access-token"]),
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

exports.deletePlayer = (req, res) => {
  PlayerModel.findOneAndDelete(
    {
      userId: decodeTokenUserId(req.headers["x-access-token"]),
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

const decodeTokenUserId = token => {
  return decode(token).id;
};
