'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/contest')
const jwt = require('../modules/jwt')

router.post('/register', jwt.auth, controller.register)

module.exports = router
