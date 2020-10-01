const User = require('../models/user')

async function register(req, res) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  register
}