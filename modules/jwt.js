'use strict'

const jwt = require('jsonwebtoken')

function sign (payload) {
  const secretKey = process.env.JWT_KEY
  return jwt.sign(payload, secretKey, { expiresIn: '1 day' })
}

module.exports = {
  sign: sign
}
