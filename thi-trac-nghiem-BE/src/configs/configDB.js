import mysql from 'mysql2/promise'

// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'thi-trac-nghiem'
});

export default pool;

