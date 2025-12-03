//require - 
//import - 
const sqlite3 = require("sqlite3").verbose();

//polaczenie z sql
const db = new sqlite3.Database("./users.db", (err) => {
    if (err) {
        console.error("Błąd połączenia z bazą SQLite:", err.message);
    } else {
        console.log("Połączono z bazą SQLite.");
    }
});

db.serialize(() => {
  //  ACID - przeczytac
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `);
});

module.exports = db;
