const PlayerModel = require("../db/models/player");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  PlayerModel.findOne({
    username: username
  }).then(user => {
    if (!user) {
      res.status(404).send({
        auth: false,
        message: "Usuário não encontrado."
      });
    } else {
      if (bcrypt.hashSync(password, user.salt) == user.password) {
        res.status(200).send({
          auth: true,
          message: "Login efetuado com sucesso!",
          userToken: signToken(user)
        });
      } else {
        res.status(401).send({
          auth: false,
          message: "Senha incorreta!"
        });
      }
    }
  });
};

exports.logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

const signToken = user => {
  const payloadJWT = {
    username: user.username,
    id: user.id
  };

  const signOptions = {
    issuer: "Players",
    subject: user.id,
    expiresIn: "12h",
    algorithm: "HS256"
  };

  return jwt.sign(payloadJWT, process.env.private_key, signOptions);
};
