const mongoose = require("../mongodb");
const { Schema } = mongoose;

const playerSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  games: [String],
  create_at: Date,
  update_at: Date
});

module.exports = mongoose.model("player", playerSchema);
