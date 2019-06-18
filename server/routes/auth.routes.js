const {Router} = require('express')
const {login, register} = require('../controllers/auth.controller')
const router = Router()


//  /api/auth/admin/login
router.post('/admin/login', login)
//  /api/auth/admin/register
router.post('/admin/register', register)


module.exports = router