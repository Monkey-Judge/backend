const mysql = require('../modules/mysql')

function truncateUsers () {
  mysql.pool.query('delete from users', function (error, results, fields) {
    if (error) {
      console.log(error)
    }
    return error
  })
}
function truncateContests () {
  mysql.pool.query('delete from contests', function (error, results, fields) {
    if (error) {
      console.log(error)
    }
    return error
  })
}
function truncateParticipants () {
  mysql.pool.query('delete from participants', function (error, results, fields) {
    if (error) {
      console.log(error)
    }
    return error
  })
}

module.exports = {
  truncateUsers: truncateUsers,
  truncateParticipants: truncateParticipants,
  truncateContests: truncateContests
}
