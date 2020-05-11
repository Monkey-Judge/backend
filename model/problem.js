var mysql = require('../modules/mysql')

function Problem (idTask, idContest) {
  this.idTask = idTask
  this.idContest = idContest
}

function erase (id) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('delete from problems where id = ?', [id], function (error, results, fields) {
      if (error !== null) reject(error)
      else resolve()
    })
  })
}

function register (problem) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('insert into problems (idTask, idContest) values(?, ?)',
      [problem.idTask, problem.idContest],
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
    mysql.pool.query('SELECT * FROM problems where id = ?', [id],
      function (error, results, fields) {
        if (error) {
          return reject(error)
        }
        if (results.length !== 0) {
          return resolve(results[0])
        } else {
          return reject(new Error('No problem with id equal to ' + id))
        }
      })
  })
}

module.exports = {
  Problem: Problem,
  erase: erase,
  register: register,
  findById: findById
}
