'use strict'

const userModel = require('../model/user')
const passwordHelper = require('../modules/passwordHelper')
const jwt = require('../modules/jwt')
const jwebt = require('jsonwebtoken')


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
  if (!('login' in req.body)) {
    console.log('ERROR: Message body without username/login')
    res.status(400).send()
    return
  }

  if (!('password' in req.body)) {
    console.log('ERROR: Message body without password')
    res.status(400).send()
    return
  }

  const username = req.body.login
  const password = req.body.password

  userModel.findByLogin(username)
    .then(user => {
      if (passwordHelper.validate(password, user.password, user.salt)) {
        const token = jwt.sign({ id: user.id })

        res.status(200).send({
          token
        })
      } else {
        res.status(403).send()
      }
    })
}

function confirm (req, res, next) {
  if (!('token' in req.body)) {
    console.log('ERROR: Missing TOKEN')
    res.status(400).send()
    return
  }
  jwebt.verify(req.body.token, 'teste', function(err, decoded) {
    if(err) {
      res.status(403).send()
    } else {
      console.log(decoded)
      userModel.confirmUserRegister(decoded.id)
        .then(() => res.status(202).send())
        .catch((error) => {
          console.log('ERROR: %s', error.message)
          res.status(400).send()
        })
    }
  });

}

module.exports = {
  register: register,
  login: login,
  confirm: confirm
}
