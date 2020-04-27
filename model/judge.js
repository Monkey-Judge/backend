var mysql = require('../modules/mysql')

function Judge (id, name, url) {
  this.id = id
  this.name = name
  this.url = url
}

function erase (id) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('delete from judges where id = ?', [id], function (error, results, fields) {
      if (error !== null) reject(error)
      else resolve()
    })
  })
}

function register (judge) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('insert into judges (name, url) values(?, ?)',
      [judge.name, judge.url],
      function (error, results, fields) {
        if (error) {
          return reject(error)
        }

        return resolve(results.insertId)
      })
  })
}

function findById (id) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM judges where id = ?', [id],
      function (error, results, fields) {
        if (error) {
          return reject(error)
        }
        if (results.length !== 0) {
          return resolve(results[0])
        } else {
          return reject(new Error('No judge with id equal to ' + id))
        }
      })
  })
}

module.exports = {
  Judge: Judge,
  erase: erase,
  register: register,
  findById: findById
}
