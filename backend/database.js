const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./voting.db');

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        token TEXT,
        hasVoted INTEGER DEFAULT 0
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT,
        choice1 TEXT,
        choice2 TEXT,
        choice3 TEXT,
        choice4 TEXT,
        choice5 TEXT
    )`);
});

module.exports = db;
