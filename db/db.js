var mysql = require('mysql')

var db = mysql.createPool({
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 8889,
  database: 'master-plan-ocr-image',

  multipleStatements: true,
})

module.exports = db
