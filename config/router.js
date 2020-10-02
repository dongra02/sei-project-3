const router = require('express').Router()

const quests = require('../controllers/quests')
const auth = require('../controllers/auth')


router.route('/quests')
  .get(quests.index)
  .post(quests.create)

router.route('/register')
  .post(auth.register)

router.route('/quests/:id/stops')
  .post(quests.stopCreate)

router.route('/login')
  .post(auth.login)



module.exports = router