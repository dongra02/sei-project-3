const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, maxlength: 50, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, default: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fthumbs.dreamstime.com%2Fz%2Fabstract-pirates-old-treasure-map-24855617.jpg&imgrefurl=https%3A%2F%2Fwww.dreamstime.com%2Froyalty-free-stock-photography-abstract-pirates-old-treasure-map-image24855617&tbnid=YtOsKaJZqmLHwM&vet=12ahUKEwjrvM2JyKDsAhUQTBoKHfqmDgoQMygFegUIARC1AQ..i&docid=_9lPADa72SFeQM&w=1300&h=986&q=copyright%20free%20pirate%20map&ved=2ahUKEwjrvM2JyKDsAhUQTBoKHfqmDgoQMygFegUIARC1AQ' }
})

userSchema
  .virtual('createdQuest', {
    ref: 'Quest',
    localField: '_id',
    foreignField: 'owner'
  })
userSchema
  .set('toJSON', {
    virtuals: true,
    transform(_doc, json) { 
      delete json.password
      return json
    }
  })

userSchema
  .virtual('passwordConfirmation')
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(require('mongoose-unique-validator'))
module.exports = mongoose.model('User', userSchema)