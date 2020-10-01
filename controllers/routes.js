const Route = require('../models/route')

async function routeCreate(req, res, _next) {
  try {
    const newRouteData = { ...req.body }
    const newRoute = await Route.create(newRouteData)
    res.status(201).json(newRoute)
  } catch (err) {
    console.log(err)
  }
}

async function routeIndex(req, res, _next){
  try {
    const routes = await Route.find()
    if (!routes) throw new Error()
    res.status(200).json(routes)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  index: routeIndex,
  create: routeCreate
}

