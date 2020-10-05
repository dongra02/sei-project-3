const mongoose = require('mongoose')

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  clue: { type: String, required: true },
  hint: { type: String },
  answerType: { type: String, enum: ['Answer', 'Proximity'], required: true },
  answer: { type: String, required: true }
})

const questSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timer: { type: Boolean, required: true, default: false },
  theme: { type: String, enum: ['Food & Drink', 'Sightseeing', 'Adventure', 'Speed'], required: true },
  location: { type: String, required: true },
  estTime: { type: String, required: true },
  stops: [stopSchema],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Quest', questSchema)