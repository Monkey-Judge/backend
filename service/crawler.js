var cheerio = require('cheerio')
var request = require('request')
var task = require('../model/task')

function getCodeforcesProblem (contestId, problem) {
  const url = `https://codeforces.com/contest/${contestId}/problem/${problem}`

  request({
    uri: url
  }, function (error, response, body, callback) {
    if (error) {
      return callback(error)
    }

    var $ = cheerio.load(body)

    var title = $('div[class=problem-statement] div[class=title]')
    var timeLimit = $('div[class=problem-statement] div[class=time-limit]')
    var memoLimit = $('div[class=problem-statement] div[class=memory-limit]')
    var statement = $('div[class=problem-statement]')

    return callback(null, task.Task(0, 0, contestId + problem, title, memoLimit, timeLimit, statement,
      '', '', '', '', ''))
  })
}

module.exports = {
  getCodeforcesProblem: getCodeforcesProblem
}
