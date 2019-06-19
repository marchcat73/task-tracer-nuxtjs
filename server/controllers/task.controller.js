const Task = require('../models/task.model')

module.exports.create = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    user: req.user.id
  })

  try {
    await task.save()
    res.status(201).json(task)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id
    }).sort({taskDate: -1})
    res.json(tasks)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    res.json(task)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.update = async (req, res) => {
  const $set = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority  
  }
  try {
    const task = await Task.findOneAndUpdate(
      {_id: req.params.id},
      {$set},
      {new: true}
    )
    res.json(task)
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Task.deleteOne({_id: req.params.id})
    res.json({message: 'Задача удалена'})
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.addTime = async (req, res) => {
  const $set = {
		timeSpend: req.body.timeSpend
	}
  try {
    await Task.findOneAndUpdate(
      {_id: req.params.id},
      {$set}
    )
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}

module.exports.statusMake = async (req, res) => {
  const $set = {
		status: req.body.status
	}
  try {
    await Task.findOneAndUpdate(
      {_id: req.params.id},
      {$set}
    )
    res.status(204).json()
  } catch (e) {
    res.status(500).json(e)
  }
}