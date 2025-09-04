const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../frontend")));

const db = new sqlite3.Database(":memory:");
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL, image TEXT)");
  const stmt = db.prepare("INSERT INTO products (name, price, image) VALUES (?, ?, ?)");
  stmt.run("Phone", 499, "images/phone.jpg");
  stmt.run("Laptop", 999, "images/laptop.jpg");
  stmt.run("Watch", 199, "images/watch.jpg");
  stmt.run("Camera", 699, "images/camera.jpg");
  stmt.run("Shoes", 149, "images/shoes.jpg");
  stmt.run("Headphones", 89, "images/headphones.jpg");
  stmt.finalize();
});

app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../frontend/index.html")));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../frontend/index.html")));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

