/* global test, expect */

const user = require('../model/user')

test('correctRegister', () => {
  const usuario = {
    id: 0,
    login: 'rafael',
    salt: 'salt',
    password: 'rafael',
    email: 'rafael@gmail.com',
    confirmed: false
  }

  return user.register(usuario)
    .then((id) => user.erase(id))
    .catch((error) => expect(error).toBe(null))
  /*
  user.register(usuario, function (error, id) {
    expect(error).toBe(null)

    user.erase(id).then(() => done())
  })
  */
})

test('confirmUserRegister', () => {
  const usuario = {
    id: 0,
    login: 'rafael',
    salt: 'salt',
    password: 'rafael',
    email: 'rafael@gmail.com',
    confirmed: false
  }

  return user.register(usuario)
    .then((id) => user.confirmUserRegister(id)
      .then(() => user.findByLogin(usuario.login))
      .then((usuario2) => expect(usuario2.confirmed).toBe(true))
      .then(() => user.erase(id)))
    .catch((error) => expect(error).toBe(null))

  /*
  user.register(usuario, function (error, id) {
    expect(error).toBe(null)

    user.confirmUserRegister(id, function (error) {
      expect(error).toBe(null)

      user.erase(id)

      done()
    })
  })
  */
})

test('findByLogin', () => {
  const usuario = {
    id: 0,
    login: 'rafael',
    salt: 'salt',
    password: 'rafael',
    email: 'rafael@gmail.com',
    confirmed: false
  }

  return user.register(usuario)
    .then((id) => user.findByLogin(usuario.login)
      .then((usuario2) => {
        usuario.id = id
        expect(usuario2).toEqual(usuario)
      })
      .then(() => user.erase(id)))
    .catch((error) => expect(error).toBe(null))
  /*
  user.register(usuario, function (error, id) {
    expect(error).toBe(null)

    user.findByLogin('rafael', function (error, usuario) {
      expect(error).toBe(null)

      expect(id).toBe(usuario.id)

      user.erase(id).then(() => done())
    })
  })
  */
})
