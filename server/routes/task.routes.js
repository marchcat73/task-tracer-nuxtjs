const passport = require('passport')
const {Router} = require('express')
const ctr = require('../controllers/task.controller')
const router = Router()

// /api/task

router.post(
  '/', 
  passport.authenticate('jwt', {session: false}),
  ctr.create
)

router.get(
  '/', 
  passport.authenticate('jwt', {session: false}),
  ctr.getAll 
)

router.get(
  '/:id', 
  passport.authenticate('jwt', {session: false}),
  ctr.getById
)

router.put(
  '/:id', 
  passport.authenticate('jwt', {session: false}),
  ctr.update
)

router.delete(
  '/:id', 
  passport.authenticate('jwt', {session: false}),
  ctr.remove
)

router.put(
  '/add/time/:id', 
  passport.authenticate('jwt', {session: false}),
  ctr.addTime
)

router.put(
  '/status/change/:id', 
  passport.authenticate('jwt', {session: false}),
  ctr.statusChange
)

module.exports = router