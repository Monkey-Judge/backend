var mysql = require('../modules/mysql')

function User (id, login, password, salt, email, confirmed) {
  this.id = id
  this.login = login
  this.password = password
  this.email = email
  this.salt = salt
  this.confirmed = confirmed
}

function erase (id) {
  mysql.pool.query('delete from users where id = ?', [id], function (error, results, fields) {

  })
}

function register (user, callback) {
  mysql.pool.query('insert into users (login, password, salt, email, confirmed) values(?, ?, ?, ?, ?)',
    [user.login, user.password, user.salt, user.email, 0],
    function (error, results, fields) {
      if (error) {
        return callback(error)
      }

      return callback(null, results.insertId)
    })
}

function findByLogin (login, callback) {
  mysql.pool.query('SELECT *FROM users where login = ?', [login],
    function (error, results, fields) {
      if (error) {
        return callback(error)
      }
      if (results.length !== 0) {
        results[0].confirmed = results[0].confirmed === 1
        return callback(error, results[0])
      } else {
        return callback(error, null)
      }
    })
}

function confirmUserRegister (id, callback) {
  mysql.pool.query('update users set confirmed=1 where id = ?', [id],
    function (error, results, fields) {
      if (error) {
        return callback(error)
      }

      return callback(null)
    })
}

module.exports = {
  User: User,
  findByLogin: findByLogin,
  register: register,
  confirmUserRegister: confirmUserRegister,
  erase: erase
}
