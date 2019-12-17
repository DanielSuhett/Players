var mongoose = require("mongoose");

var mongoDB = "mongodb://localhost:27017/dbPlayers";

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
