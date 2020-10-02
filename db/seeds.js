const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Quest = require('../models/quest')
const User = require('../models/user')
const stopData = require('./data/stops')
const questData = require('./data/quests')
const userData = require('./data/users')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  async (err, db) => {
    if (err) {
      console.log(err)
      return
    }
    try {
      await mongoose.connection.db.dropDatabase()
      console.log('Database dropped!')
      const users = await User.create(userData)
      
      const questsWithUsers = questData.map(quest => {
        quest.owner = users[0]
        stopData.map(stop => quest.stops.push(stop))
        return quest
      })
      await Quest.create(questsWithUsers)
    } catch (err) {
      console.log(err)
    }
    console.log('Goodbye')
    await mongoose.connection.close()
  }
)