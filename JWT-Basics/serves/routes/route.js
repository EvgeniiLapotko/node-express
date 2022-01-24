const express = require('express')
const router = express.Router()
const {getJwt, dashboard, login} = require('../controllers/controller')

const authenticationMiddleware = require('../midlleware/auth')




router.route('/').get(getJwt)
router.route('/login').post(login)
router.route('/dashboard').get(authenticationMiddleware, dashboard)


module.exports = router
