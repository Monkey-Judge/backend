var mysql = require('../modules/mysql')

function User (id, login, password, salt, email, role, confirmed) {
  this.id = id
  this.login = login
  this.password = password
  this.email = email
  this.role = role
  this.salt = salt
  this.confirmed = confirmed
}

function erase (id) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('delete from users where id = ?', [id], function (error, results, fields) {
      if (error !== null) reject(error)
      else resolve()
    })
  })
}

function register (user) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('insert into users (login, password, salt, email, role, confirmed) values(?, ?, ?, ?, ?, ?)',
      [user.login, user.password, user.salt, user.email, user.role, 0],
      function (error, results, fields) {
        if (error) {
          return reject(error)
        }

        return resolve(results.insertId)
      })
  })
}

function findByLogin (login) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM users where login = ?', [login],
      function (error, results, fields) {
        if (error) {
          return reject(error)
        }
        if (results.length !== 0) {
          results[0].confirmed = results[0].confirmed === 1
          return resolve(results[0])
        } else {
          return reject(new Error('No user with login equal to ' + login))
        }
      })
  })
}

function confirmUserRegister (id) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM users where id = ?', [id],
      function (error, results, fields) {
        if (error) {
          return reject(error)
        }
        if (results.length !== 0) {
          if (results[0].confirmed === 1) {
            return reject(new Error('User already confirmed'))
          }
        } else {
          return reject(new Error('User not found'))
        }
      })
    mysql.pool.query('update users set confirmed=1 where id = ?', [id],
      function (error, results, fields) {
        if (error) {
          return reject(error)
        }

        return resolve()
      })
  })
}

module.exports = {
  User: User,
  findByLogin: findByLogin,
  register: register,
  confirmUserRegister: confirmUserRegister,
  erase: erase
}
