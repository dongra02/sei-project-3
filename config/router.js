const router = require('express').Router()

const quests = require('../controllers/quests')
const auth = require('../controllers/auth')


router.route('/quests')
  .get(quests.index)
  .post(quests.create)

router.route('/quests/:id')
  .get(quests.show)
  .put(quests.questUpdate)

router.route('/quests/:id/stops')
  .post(quests.stopCreate)

router.route('/quests/:id/stops/:stopId')
  .get(quests.stopShow)
  .put(quests.stopUpdate)

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

module.exports = router