const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const logger = require("morgan");

app.use(bodyParser.json());

app.use(logger("dev"));

require("./routes/users.routes")(app);
require("./routes/auth.routes")(app);

app.listen(3000);
