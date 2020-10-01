const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Quest = require('../models/quest')
const stopData = require('./data/stops')
const questData = require('./data/quests')

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
      const quest = await Quest.create(questData)
      console.log(quest)
      stopData.map(stop => quest.stops.push(stop))
      await quest.save()
    } catch (err) {
      console.log(err)
    }
    console.log('Goodbye')
    await mongoose.connection.close()
  }
)