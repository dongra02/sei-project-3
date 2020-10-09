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

const reviewSchema = mongoose.Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
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
  description: { type: String, required: true, maxlength: 350 },
  estTime: { type: Number, required: true },
  stops: [stopSchema],
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  reviews: [reviewSchema],
  completedTimes: [{ type: Number }]
}, {
  timestamps: true
})

questSchema
  .virtual('avgRating')
  .get(function() {
    if (!this.reviews.length) return 'Not yet rated'
    return Math.round(this.reviews.reduce((acc, curr) => {
      return acc + curr.rating
    }, 0) / this.reviews.length)
  })

questSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Quest', questSchema)