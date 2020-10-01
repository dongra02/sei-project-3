const mongoose = require('mongoose')

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  question: {
    clue: { type: String, required: true },
    answer: { type: String, required: true }
  }
})

const questSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timer: { type: Boolean, required: true, default: false },
  stops: [stopSchema]
  // owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
})

module.exports = mongoose.model('Quest', questSchema)