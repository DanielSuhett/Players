const mongoose = require("../mongodb");
const { Schema } = mongoose;
const playerSchema = require("./player");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  salt: String,

  data: [{ type: Schema.Types.ObjectId, ref: playerSchema }]
});

module.exports = mongoose.model("user", userSchema);
