var mysql = require('../modules/mysql')
var sqlLoad = {
  submissions: ['inner join submissions', 'and contests.id = submissions.idContest'],
  participants: ['inner join participants', 'and contests.id = participants.idContest'],
  problems: ['inner join problems inner join tasks', 'and contests.id = problems.idContest and tasks.id = problems.idTask']
}

function Submission (id, resolve, timeSend, timeUsed, memoryUsed, code, idLanguage, idUser, idTask, contestId, titleTask) {
  this.id = id
  this.resolve = resolve
  this.timeSend = timeSend
  this.timeUsed = timeUsed
  this.memoryUsed = memoryUsed
  this.code = code
  this.idLanguage = idLanguage
  this.idUser = idUser
  this.idTask = idTask
  this.contestId = contestId
  this.titleTask = titleTask
}

function Contest (id, begin, duration, name, description, submissions, participants, problems) {
  this.id = id
  this.duration = duration
  this.name = name
  this.description = description
  this.submissions = submissions
  this.participants = participants
  this.problems = problems
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
    mysql.pool.query('delete from contests where id = ?', [id], function (error, results, fields) {
      if (error !== null) reject(error)
      else resolve()
    })
  })
}

function findById (id, load = []) { // load is an array that can have the following elements ['submissions', 'participants', 'problems']
  let sql = 'SELECT * FROM contests where contests.id = ?'
  let join = ''
  let whr = ''

  for (let i = 0; i < load.length; i++) {
    join = join + ' ' + sqlLoad[load[i]][0]
    whr = whr + ' ' + sqlLoad[load[i]][1]
  }

  sql = `SELECT * FROM contests ${join} where contests.id = ? ${whr}`
  console.log(sql)
  console.log(id)

  return new Promise((resolve, reject) => {
    mysql.pool.query(sql, [id],
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
  addSubmission: Contest.addSubmission,
  register: register,
  erase: erase,
  findById: findById,
  Submission: Submission
}
