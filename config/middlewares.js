const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors")
module.exports = app => {
  app.use(bodyParser.json());
  app.use(cors())
  app.use(logger("dev"));

}

