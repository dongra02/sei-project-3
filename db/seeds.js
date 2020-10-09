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

      const randQuests = []
      for (let quest = 0; quest < 5; quest++) {
        const stops = []
        const reviews = []
        const description = faker.lorem.sentence()
        const name = `Quest ${quest + 1}`
        const theme = ['Food & Drink', 'Sightseeing', 'Adventure', 'Speed'][Math.floor(Math.random() * 4)]
        const estTime = Math.max(Math.ceil(Math.random() * 60), 25)
        const location = {
          latitude: Number(faker.address.nearbyGPSCoordinate(['51.5074', '0.1278' ])[0]),
          longitude: Number(faker.address.nearbyGPSCoordinate(['51.5074', '0.1278' ])[1])
        }
        for (let stop = 0; stop < 4; stop++) {
          const name = `Stop ${stop + 1}`
          const location = {
            latitude: Number(faker.address.nearbyGPSCoordinate(['51.5074', '0.1278' ])[0]),
            longitude: Number(faker.address.nearbyGPSCoordinate(['51.5074', '0.1278' ])[1])
          }
          const clue = `Clue ${stop + 1}`
          const answerType = 'Answer'
          const answer = `Answer ${stop + 1}`
          const hint = `Hint ${stop + 1}`
          stops.push({
            name,
            location,
            clue,
            answerType,
            answer,
            hint
          })
        }
        randQuests.push({
          stops,
          name,
          description,
          theme,
          estTime,
          location,
          reviews
        })
      }
      randQuests.push( ...questData )
      
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
        const quest = randQuests[Math.floor(Math.random() * randQuests.length)]
        const rating = Math.ceil(Math.random() * 5)
        const text = faker.lorem.sentence()
        const owner = createdUsers[Math.floor(Math.random() * createdUsers.length)]
        quest.reviews.push({
          rating,
          text,
          owner
        })
      }

      const questsWithUsersReviews = randQuests.map(quest => {
        quest.owner = createdUsers[(Math.floor(Math.random() * createdUsers.length))]
        let nameFirst = faker.lorem.word()
        nameFirst = nameFirst.charAt(0).toUpperCase() + nameFirst.slice(1)
        quest.name = `${nameFirst} Quest by ${quest.owner.username}`
        return quest
      })

      await Quest.create(questsWithUsersReviews)
      console.log(`${questsWithUsersReviews.length} quests added with reviews!`)

    } catch (err) {
      console.log(err)
    }
    console.log('Goodbye')
    await mongoose.connection.close()
  }
)