const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Canche2019!',
        database: 'companyInfo'
    }
);

module.exports = db;