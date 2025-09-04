// backend/database.js
const sqlite3 = require("sqlite3").verbose();

// Create or open database file
const db = new sqlite3.Database("./ecommerce.db");

// Create tables if not exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      image TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT
  )`);
});

// Export database connection
module.exports = db;

