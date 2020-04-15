'use strict'

const jwt = require('jsonwebtoken')

function generateToken (data, salt) {
  const token = jwt.sign(data, salt, { expiresIn: '1d' })
  return token
}

function decodeToken (token, salt) {
  const data = jwt.verify(token, salt)
  return data
}

function authorize (req, res, next) {
  const token = req.headers['x-access-token']

  if (!token) {
    res.status(401).json({
      msg: 'Acesso Restrito'
    })
  } else {
    jwt.verify(token, global.SALT_KEY, (error, decoded) => {
      if (error) {
        res.status(404).json({
          msg: 'Token Invalido'
        })
      } else {
        next()
      }
    })
  }
}

module.exports = {
  generateToken: generateToken,
  decodeToken: decodeToken,
  authorize: authorize
}
