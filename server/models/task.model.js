const {Schema, model} = require('mongoose')

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  taskDate: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'запланирована'
  },
  timeSpend: {
    type: Number,
    default: 0
  },
  user: {
    ref: `users`,
    type: Schema.Types.ObjectId
  }

})

module.exports = model('tasks', taskSchema)