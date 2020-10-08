const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const { unauthorized, notFound } = require('../lib/errorMessages')

async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(req.body.password)) throw new Error(unauthorized)
    const token = jwt.sign(
      { sub: user._id },
      secret,
      { expiresIn: '7 days' }
    )
    res.status(202).json({ message: `Welcome back ${user.username}`, token })
  } catch (err) {
    next(err)
  }
}

async function profile(req, res, next) {
  try {
    const user = await User.findById(req.params.id)
      .populate('createdQuest')
    if (!user) throw new Error(notFound)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function userProfile(req, res, next) {
  try {
    const userId = req.currentUser._id
    const user = await User.findById(userId)
      .populate('createdQuest')
    if (!user) throw new Error(notFound)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function profileIndex(_req, res, next) {
  try {
    const users = await User.find()
      .populate('createdQuest')
    if (!users) throw new Error(notFound)
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  register,
  login,
  profile,
  profileIndex,
  userProfile
}