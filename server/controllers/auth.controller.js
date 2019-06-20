const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({email: req.body.email})
  
  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)

    if (isPasswordCorrect) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.JWT, {expiresIn: 60 * 60 * 24})
      res.json({token})
    } else {
      res.status(401).json({message: 'Пароль неверен'})
    }
  } else {
    res.status(404).json({message: 'Пользователь не найден'})
  }
}

module.exports.register = async (req, res) => {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    res.status(409).json({message: 'Такой email уже занят'})
  } else {
    const salt = bcrypt.genSaltSync(10)
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt) 
    })

    await user.save()
    res.status(201).json(user)
  }
}