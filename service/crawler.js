var cheerio = require('cheerio')
var request = require('request')
var task = require('../model/task')

function getCodeforcesProblem (contestId, problem, callback) {
  const url = `https://codeforces.com/contest/${contestId}/problem/${problem}`

  return new Promise(
    (resolve, reject) => {
      request({
        uri: url
      }, function (error, response, body) {
        if (error) {
          return reject(error)
        }

        var $ = cheerio.load(body)

        var title = $('div[class=problem-statement] div[class=title]')
        var timeLimit = $('div[class=problem-statement] div[class=time-limit]')
        var memoLimit = $('div[class=problem-statement] div[class=memory-limit]')
        var statement = $('div[class=problem-statement]')

        return resolve(task.Task(0, 0, contestId + problem, title, memoLimit, timeLimit, statement,
          '', '', '', '', ''))
      })
    }
  )
}

module.exports = {
  getCodeforcesProblem: getCodeforcesProblem
}
