/*AVIEN CONNECTION*/
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.AIVEN_DB_HOST,
  user: process.env.AIVEN_DB_USER,
  password: process.env.AIVEN_DB_PASS,
  database: process.env.AIVEN_DB_NAME,
  port: process.env.AIVEN_DB_PORT,

  // Aiven requires SSL
  ssl: {
    ca: fs.readFileSync(path.resolve(__dirname, "ca.pem")),
  },

  // Pooling (keep small on free tier)
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

// Test connection
db.getConnection((err, conn) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
  } else {
    console.log("MySQL Pool Connected to Aiven");
    conn.release();
  }
});

module.exports = db;


/*normal connection
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// test connection
db.getConnection((err, conn) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
  } else {
    console.log("MySQL Pool Connected...");
    conn.release();
  }
});

module.exports = db;
*/

