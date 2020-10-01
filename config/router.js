const router = require('express').Router()

const quests = require('../controllers/quests')
const auth = require('../controllers/auth')


router.route('/quests')
  .get(quests.index)
  .post(quests.create)

router.route('/register')
  .post(auth.register)

// router.route(/routes/:routeId/stops)



module.exports = router