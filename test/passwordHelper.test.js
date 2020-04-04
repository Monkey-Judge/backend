/* global test, expect */

const passwordHelper = require('../modules/passwordHelper')

test('encrypt', () => {
  const password = 'paulo123'
  const { salt, hash } = passwordHelper.encrypt(password)
  expect(typeof salt).toBe('string')
  expect(typeof hash).toBe('string')
})

test('validate the correct password', () => {
  const password = 'paulo123'
  const otherPassword = 'paulo123'
  const { salt, hash } = passwordHelper.encrypt(password)
  const validated = passwordHelper.validate(otherPassword, hash, salt)
  expect(validated).toBe(true)
})

test('validate the wrong password', () => {
  const password = 'paulo123'
  const otherPassword = 'paulo456'
  const { salt, hash } = passwordHelper.encrypt(password)
  const validated = passwordHelper.validate(otherPassword, hash, salt)
  expect(validated).toBe(false)
})
