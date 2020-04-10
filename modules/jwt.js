'use strict'

const jwt = require('jsonwebtoken')

function sign (payload) {
  if (!('JWT_KEY' in process.env)) {
    throw new Error('Enviorment variables JWT_KEY is not defined')
  }
  const secretKey = process.env.JWT_KEY
  return jwt.sign(payload, secretKey, { expiresIn: '1 day' })
}

module.exports = {
  sign: sign
}
