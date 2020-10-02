const Quest = require('../models/quest')
const { notFound } = require('../lib/errorMessages')

async function questCreate(req, res, next) {
  try {
    const newQuestData = { ...req.body }
    const newQuest = await Quest.create(newQuestData)
    res.status(201).json(newQuest)
  } catch (err) {
    next(err)
  }
}

async function questIndex(_req, res, next){
  try {
    const quests = await Quest.find()
    if (!quests) throw new Error(notFound)
    res.status(200).json(quests)
  } catch (err) {
    next(err)
  }
}

async function stopCreate(req, res, next){
  try {
    const quest = await Quest.findById(req.params.id)
    if (!quest) throw new Error(notFound)
    const stop = { ...req.body }
    quest.stops.push(stop)
    await quest.save()
    res.status(201).json(quest)
  } catch (err) {
    next(err)
  }
}

async function questShow(req, res, next) {
  try {
    const quest = await Quest.findById(req.params.id)
    if (!quest) throw new Error(notFound)
    res.status(200).json(quest)
  } catch (err) {
    next(err)
  }
}

async function questUpdate(req, res, next) {
  try {
    const questToEdit = await Quest.findById(req.params.id)
    if (!questToEdit) throw new Error(notFound)
    Object.assign(questToEdit, req.body)
    await questToEdit.save()
    res.status(202).json(questToEdit)
  } catch (err) {
    next(err)
  }
}

async function stopShow(req, res, next) {
  try {
    const quest = await Quest.findById(req.params.id)
    if (!quest) throw new Error(notFound)
    const stop = await quest.stops.id(req.params.stopId)
    if (!stop) throw new Error(notFound)
    res.status(200).json(stop)
  } catch (err) {
    next(err)
  }
}

async function stopUpdate(req, res, next) {
  try {
    const quest = await Quest.findById(req.params.id)
    if (!quest) throw new Error(notFound)
    const stopToEdit = await quest.stops.id(req.params.stopId)
    if (!stopToEdit) throw new Error(notFound)
    Object.assign(stopToEdit, req.body)
    await stopToEdit.save()
    res.status(202).json(stopToEdit)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  index: questIndex,
  create: questCreate,
  show: questShow,
  stopCreate,
  stopShow,
  questUpdate,
  stopUpdate
}

