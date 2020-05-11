const express = require('express')
const router = express.Router()
const controller = require('../controllers/contest')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/task', controller.addTask)

module.exports = router
