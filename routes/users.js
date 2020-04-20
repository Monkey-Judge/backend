'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/register', controller.register)

router.post('/login', controller.login)

router.post('/confirm', controller.confirm)

module.exports = router
