const mongoose = require('mongoose')
const faker = require('faker')
const { dbURI } = require('../config/environment')
const Quest = require('../models/quest')
const User = require('../models/user')
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
      
      const users = []

      for (let i = 0; i < 100; i++) {
        const username = faker.internet.userName()
        const email = `${username}@email.com`
        const imageUrl = faker.image.avatar()
        const password = 'pass'
        const passwordConfirmation = 'pass'
        users.push({
          username,
          email,
          imageUrl,
          password,
          passwordConfirmation
        })
      }

      const createdUsers = await User.create(users)
      console.log(`${createdUsers.length} users added!`)

      
      for (let i = 0; i < 20; i++) {
        const quest = questData[Math.floor(Math.random() * questData.length)]
        const rating = Math.ceil(Math.random() * 5)
        const text = faker.lorem.sentence()
        const owner = createdUsers[Math.floor(Math.random() * createdUsers.length)]
        quest.comments.push({
          rating,
          text,
          owner
        })
      }

      const questsWithUsersComments = questData.map(quest => {
        quest.owner = createdUsers[(Math.floor(Math.random() * 100))]
        return quest
      })

      
      await Quest.create(questsWithUsersComments)
      console.log(`${questsWithUsersComments.length} quests added with comments!`)


    } catch (err) {
      console.log(err)
    }
    console.log('Goodbye')
    await mongoose.connection.close()
  }
)