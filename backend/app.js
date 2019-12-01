const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(bodyParser.json());

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "Você não tem permissão!" });

  jwt.verify(token, process.env.private_key, err => {
    if (err) res.status(401).send({ message: err });
  });
  next();
};

app.use(logger("dev"));

require("./routes/users.routes")(app, verifyJWT);
require("./routes/auth.routes")(app);

app.listen(process.env.port || 3000);
