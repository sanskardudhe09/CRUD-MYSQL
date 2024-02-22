
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql');
var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB
});
module.exports = conn;