const mongoose = require('../services/mongodb');
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: String,
    games: [String],
    create_at: Date,
    update_at: Date
})

module.exports = mongoose.model('player', playerSchema)