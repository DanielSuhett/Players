const mongoose = require("../config/db");
const { Schema } = mongoose;

const playerSchema = new Schema({
  userId: String,
  username: {
    type: String,
    required: true
  },
  games: [String],
  create_at: Date,
  update_at: Date
});

module.exports = mongoose.model("player", playerSchema);
