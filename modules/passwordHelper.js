'use strict'
const crypto = require('crypto')
const SALT_SIZE = 20
const PASSWORD_LENGTH = 45

function genRandomString (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

function sha512 (password, salt) {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const passwordHash = hash.digest('hex').slice(0, PASSWORD_LENGTH)
  return {
    salt: salt,
    hash: passwordHash
  }
}

function encrypt (password) {
  const salt = genRandomString(SALT_SIZE)
  const encryptedPassword = sha512(password, salt)
  return encryptedPassword
}

function validate (password, encryptedPassword, salt) {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const passwordHash = hash.digest('hex').slice(0, PASSWORD_LENGTH)
  return passwordHash === encryptedPassword
}

module.exports = {
  encrypt: encrypt,
  validate: validate
}
