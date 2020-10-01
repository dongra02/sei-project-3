const Quest = require('../models/quest')

async function questCreate(req, res, _next) {
  try {
    const newQuestData = { ...req.body }
    const newQuest = await Quest.create(newQuestData)
    res.status(201).json(newQuest)
  } catch (err) {
    res.status(422).json(err)
    console.log(err)
  }
}

async function questIndex(req, res, _next){
  try {
    const quests = await Quest.find()
    if (!quests) throw new Error()
    res.status(200).json(quests)
  } catch (err) {
    res.status(404).json(err)
    console.log(err)
  }
}

module.exports = {
  index: questIndex,
  create: questCreate
}

