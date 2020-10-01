const router = require('express').Router()
const routes = require('../controllers/routes')


router.route('/routes')
  .get(routes.index)
  .post(routes.create)

// router.route(/routes/:routeId/stops)



module.exports = router