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

const commentSchema = mongoose.Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
}, {
  timestamps: true
})

const questSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timer: { type: Boolean, required: true, default: false },
  theme: { type: String, enum: ['Food & Drink', 'Sightseeing', 'Adventure', 'Speed'], required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  estTime: { type: Number, required: true },
  stops: [stopSchema],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
}, {
  timestamps: true
})

questSchema
  .virtual('avgRating')
  .get(function() {
    if (!this.comments.length) return 'Not yet rated'
    return Math.round(this.comments.reduce((acc, curr) => {
      return acc + curr.rating
    }, 0) / this.comments.length)
  })

questSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Quest', questSchema)