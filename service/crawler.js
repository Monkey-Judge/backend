var cheerio = require('cheerio')
var request = require('request')
var task = require('../model/task')

function filter (text) {
  return text.replace(/[\n\r]/g, '')
}

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

function getAtCoderProblem (contestId, problem) {
  const uri =
    `https://atcoder.jp/contests/${contestId}/tasks/${problem}`

  return new Promise((resolve, reject) => {
    request({
      uri: uri
    }, function (error, response, body) {
      if (error != null) {
        reject(error)
      }

      const $ = cheerio.load(body)

      // get <title> tag
      const title = $('title').text().split('-')[1].trim()

      // the limits is on <p>Time Limit: X sec / Memory Limit: X MB</p>
      const limits = $('p:contains("Time Limit")')
      const tokens = limits.text().split('/')
      const timeLimit = Number(tokens[0].trim().split(' ')[2])
      const memLimit = Number(tokens[1].trim().split(' ')[2]) * 1024 * 1024

      // each part of problem description have the class part
      const parts = $('.lang-en .part section')

      // remove the h3 tag for each section
      $('.lang-en .part section h3').remove()

      const statement = filter(parts.eq(0).html() + '<h2>Constraints</h2>' + parts.eq(1).html())
      const input = filter(parts.eq(2).html())
      const output = filter(parts.eq(3).html())
      const sourceLink = uri

      return resolve(
        new task.Task(0, 0, `${contestId}/${problem}`, title,
          memLimit, timeLimit, statement, input, output, null, null, sourceLink)
      )
    })
  })
}

module.exports = {
  getCodeforcesProblem: getCodeforcesProblem,
  getAtCoderProblem: getAtCoderProblem
}
