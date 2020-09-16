const mysql = require('mysql2');
require('dotenv').config()
const env = require('../helpers/h_env')

const connection = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    database: env.DB_DATABASE,
    dateStrings: 'date'
})

module.exports = connection