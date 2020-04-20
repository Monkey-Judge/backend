'use strict'

const jwt = require('jsonwebtoken')

function sign (payload) {
  if (!('JWT_KEY' in process.env)) {
    throw new Error('Enviorment variables JWT_KEY is not defined')
  }
  const secretKey = process.env.JWT_KEY
  return jwt.sign(payload, secretKey, { expiresIn: '1 day' })
}

function auth (req, res, next) {
  var token = req.headers.authorization

  if (!token) {
    return res.status(401).send('Token inexistente')
  }

  jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).send('Token invalido')
    }

    req.userData = decoded

    next()
  })
}

module.exports = {
  sign: sign,
  auth: auth
}
