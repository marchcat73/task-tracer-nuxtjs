const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const authRoutes = require('./routes/auth.routes')
const taskRoutes = require('./routes/task.routes')
const keys = require('./keys')
const app = express()

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(keys.MONGO_URI)
  .then(() => console.log('MongoDB connected....'))
  .catch(error => console.error(error))

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

const enableCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}
app.use(enableCrossDomain)

app.use('/api/auth', authRoutes)
app.use('/api/task', taskRoutes)

module.exports = app