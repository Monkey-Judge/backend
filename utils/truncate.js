const mysql = require('../modules/mysql')

function truncateUsers () {
  mysql.pool.query('delete from users', function (error, results, fields) {
    if (error) {
      console.log(error)
    }
    return error
  })
}

module.exports = {
  truncate: truncateUsers
}
