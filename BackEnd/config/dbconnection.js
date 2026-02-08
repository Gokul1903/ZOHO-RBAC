require('dotenv').config();
const mysql = require('mysql2/promise');

//creating pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//connecting to backend
async function connectDB() {
  try {
    const connection = await db.getConnection();
    console.log("DB Connected");
    connection.release();
  } catch (err) {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  }
}

module.exports = { db, connectDB };