const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, maxlength: 50, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
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