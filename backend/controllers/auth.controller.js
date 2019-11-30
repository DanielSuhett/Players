const mongoose = require("../db/mongodb");
const PlayerModel = require("../db/models/player");
var bcrypt = require("bcryptjs");

exports.login = (req, res) => {
  const { username, password } = req.body;

  PlayerModel.findOne({
    username: username
  }).then(user => {
    if (!user) {
      res.send(404, {
        message: "Usuário não encontrado."
      });
    } else {
      if (bcrypt.hashSync(password, user.salt) == user.password) {
        res.send(200, {
          message: "Login efetuado com sucesso!",
          user: user
        });
      } else {
        res.send(401, {
          login: "error",
          message: "Senha incorreta!"
        });
      }
    }
  });
};
