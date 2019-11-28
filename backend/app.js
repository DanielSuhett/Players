const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log(`Metodo: ${req.method} em ${req.url}`);
  next();
});

require("./routes/persons.routes")(app);

app.listen(3000);
