const mongoose = require('mongoose')

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  latLon: [{ type: Number, required: true }],
  location: {
    latitute: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  question: {
    clue: { type: String, required: true },
    answer: { type: String, required: true }
  }
})

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timer: { type: Boolean, required: true, default: false },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  stops: [stopSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Route', routeSchema)