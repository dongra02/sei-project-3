const router = require('express').Router()

const quests = require('../controllers/quests')
const auth = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')


router.route('/quests')
  .get(quests.index)
  .post(quests.create)

router.route('/quests/:id')
  .get(quests.show)
  .put(quests.questUpdate)
  .delete(quests.questDelete)

router.route('/quests/:id/stops')
  .post(quests.stopCreate)

router.route('/quests/:id/stops/:stopId')
  .get(quests.stopShow)
  .put(quests.stopUpdate)
  .delete(quests.stopDelete)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

router.route('/users')
  .get(auth.profileIndex)

router.route('/users/:id')
  .get(auth.profile)

module.exports = router