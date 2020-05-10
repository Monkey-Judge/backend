var mysql = require('../modules/mysql')

function Task (id, idJudge, originalId, title, memoryLimit,
  timeLimit, statement, input, output, notes, pdfLink, sourceLink) {
  this.id = id
  this.idJudge = idJudge
  this.originalId = originalId
  this.title = title
  this.memoryLimit = memoryLimit
  this.timeLimit = timeLimit
  this.statement = statement
  this.input = input
  this.output = output
  this.notes = notes
  this.pdfLink = pdfLink
  this.sourceLink = sourceLink
}

function erase (id) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('delete from tasks where id = ?', [id], function (error, results, fields) {
      if (error !== null) reject(error)
      else resolve()
    })
  })
}

function register (task) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('insert into tasks (idJudge, originalId, title, memoryLimit, timeLimit' +
      ', statement, input, output, notes, pdfLink, sourceLink) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [task.idJudge, task.originalId, task.title, task.memoryLimit, task.timeLimit,
      task.statement, task.input, task.output, task.notes, task.pdfLink, task.sourceLink],
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
    mysql.pool.query('SELECT * FROM tasks where id = ?', [id],
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
  Task: Task,
  erase: erase,
  register: register,
  findById: findById
}
