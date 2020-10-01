const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

async function register(req, res) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (err) {
    res.status(422).json(err)
    console.log(err)
  }
}

async function login(req, res, _next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(req.body.password)) throw new Error()
    const token = jwt.sign(
      { sub: user._id },
      secret,
      { expiresIn: '7 days' }
    )
    res.status(202).json({ message: `Welcome back ${req.username}`, token })
  } catch (err) {
    res.status(401).json(err)
    console.log(err)
  }
}

module.exports = {
  register,
  login
}