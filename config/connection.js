const mysql = require("mysql2");

require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//if error throw error
connection.connect((err)=>{
    if (err) throw err;
});

//exports to connect
module.export = connection;