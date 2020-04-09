'use strict'

const userModel = require('../model/user')
const passwordHelper = require('../modules/passwordHelper')

function register (req, res, next) {
  const encryptedPassword = passwordHelper.encrypt(req.body.password)
  const user = new userModel.User(
    1,
    req.body.login,
    encryptedPassword.hash,
    encryptedPassword.salt,
    req.body.email,
    0
  )

  userModel.register(user)
    .then((id) => res.status(201).send())
    .catch((error) => {
      console.log('ERROR: %s', error.message)
      res.status(400).send()
    })
}

function login (req, res, next) {
  if (req.body.login === null) {
    console.log('ERROR: Message body without username/login')
    res.status(400).send()
  }

  if (res.body.password === null) {
    console.log('ERROR: Message body without password')
    res.status(400).send()
  }

  const username = req.body.login
  const password = req.body.password

  userModel.findByLogin(username)
    .then(user => {
      if (passwordHelper.validate(password, user.password, user.salt)) {
        const token = '<TOKEN HERE>'
        res.status(200).send({
          token
        })
      } else {
        res.status(403).send()
      }
    })
}

module.exports = {
  register: register,
  login: login
}
