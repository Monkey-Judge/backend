var mysql = require('../modules/mysql')

function Contest (id, begin, duration, name, description) {
  this.id = id
  this.duration = duration
  this.name = name
  this.description = description
}

function register (contest) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('insert into contests (begin, duration, name, description) values(?, ?, ?, ?)',
      [contest.begin, contest.duration, contest.name, contest.description],
      function (error, results, fields) {
        if (error) {
          return reject(error)
        }

        return resolve(results.insertId)
      })
  })
}

function erase (id) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('delete from constests where id = ?', [id], function (error, results, fields) {
      if (error !== null) reject(error)
      else resolve()
    })
  })
}

function findById (id, lazzy = false) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM contests where id = ?', [id],
      function (error, results, fields) {
        if (error) {
          return reject(error)
        }
        if (results.length !== 0) {
          return resolve(results[0])
        } else {
          return reject(new Error('No contest with id equal to ' + id))
        }
      })
  })
}

module.exports = {
  Contest: Contest,
  register: register,
  erase: erase,
  findById: findById
}
