
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'eventickets_db',
    // port: process.env.DB_PORT || 3308,
});

db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = db;